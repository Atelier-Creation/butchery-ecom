import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileFooter from "../MobileDesign/MobileFooter";
import Navbar from "../MobileDesign/Navbar";
import { loginUser } from "../../api/authApi";
import { addToCartAPI } from "../../api/cartApi";
import { getProducts } from "../../api/productApi"; // used to resolve SKUs -> _id

// ✅ Import Lucide icons
import { Eye, EyeClosed } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // cache of products for resolution
  const [productsCache, setProductsCache] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parse postLoginRedirect from query params (preferred) or fallback to localStorage (legacy)
  const query = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const paramRedirect = query.get("postLoginRedirect");
  // keep this in state so subsequent code can access it
  const [postLoginRedirect] = useState(paramRedirect || localStorage.getItem("postLoginRedirect") || null);

  // load product catalog once and cache — used to resolve SKUs/id->ObjectId
  const loadProductsCache = useCallback(
    async () => {
      if (productsCache) return productsCache;
      try {
        const res = await getProducts();
        const products = (res && (res.data || res)) || [];
        setProductsCache(products);
        return products;
      } catch (err) {
        console.warn("Failed to fetch products for SKU resolution:", err);
        setProductsCache([]);
        return [];
      }
    },
    [productsCache]
  );

  // Helper: read guest cart from localStorage
  const getGuestCart = useCallback(() => {
    try {
      const raw = localStorage.getItem("guest_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Failed to parse guest_cart", err);
      return [];
    }
  }, []);

  // Helper: quick ObjectId check
  const isObjectId = (id) => typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);

  // Try to resolve many possible product identifier fields to a real product._id
  const resolveProductObjectId = async (identifier) => {
    if (!identifier) return null;
    if (isObjectId(identifier)) return identifier;

    const products = await loadProductsCache();
    const norm = (s) => (s || "").toString().toLowerCase().trim();
    const idLower = norm(identifier);

    const found = products.find((p) => {
      if (!p) return false;
      if (isObjectId(p._id) && p._id === identifier) return true;
      if (p.productId && norm(p.productId) === idLower) return true;
      if (p.id && norm(p.id) === idLower) return true;
      if (p.SKU && norm(p.SKU) === idLower) return true;
      if (p.sku && norm(p.sku) === idLower) return true;
      if (p.name && norm(p.name) === idLower) return true;
      if (p.tamilName && norm(p.tamilName) === idLower) return true;
      if (p.slug && norm(p.slug) === idLower) return true;
      return false;
    });

    if (found && found._id) return found._id;
    return null;
  };

  // Map a guest-cart item into addToCartAPI args (with resolution)
  const mapGuestItemToAddArgsWithResolve = async (item) => {
    const rawPid =
      item?.product?._id ||
      item?.productId ||
      item?.product?._id ||
      item?.id ||
      item?._id ||
      item?.SKU ||
      item?.sku ||
      null;

    let resolvedPid = rawPid;
    if (!isObjectId(rawPid)) {
      resolvedPid = await resolveProductObjectId(rawPid || item?.name || item?.title?.en);
    }

    const quantity = item?.quantity || item?.qty || 1;
    const price = item?.price || item?.unitPrice || item?.product?.price || null;
    const weightOptionId =
      item?.weightOptionId || item?.weightOption?._id || item?.variantId || item?.weightId || null;

    return { productId: resolvedPid, quantity, price, weightOptionId, rawPid };
  };

  // Merge guest cart into server cart (resolving product ids when needed)
  const mergeGuestCartToServer = async () => {
    const guestCart = getGuestCart();
    if (!guestCart || guestCart.length === 0) return { successCount: 0, failCount: 0, errors: [] };

    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (const item of guestCart) {
      try {
        const { productId, quantity, price, weightOptionId, rawPid } =
          await mapGuestItemToAddArgsWithResolve(item);

        if (!productId) {
          failCount++;
          errors.push({
            item,
            reason: `Could not resolve product id for identifier "${rawPid ?? "unknown"}"`,
          });
          console.warn("Skipping guest cart item (unresolved):", item, { rawPid });
          continue;
        }

        await addToCartAPI(productId, quantity, price, weightOptionId);
        successCount++;
      } catch (err) {
        failCount++;
        errors.push({ item, err: err?.message || err });
        console.warn("Failed to merge guest cart item", { item, err });
      }
    }

    return { successCount, failCount, errors };
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email, password });

      if (response?.token) {
        // store token + user first so merge API calls can use token if reading from localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // If guest cart exists, attempt merge
        const guestCart = getGuestCart();
        if (guestCart && guestCart.length > 0) {
          try {
            const result = await mergeGuestCartToServer();
            console.info(
              `Guest cart merge completed: ${result.successCount} succeeded, ${result.failCount} failed.`,
              result.errors.length ? result.errors : ""
            );
            // After attempt, remove guest_cart
            localStorage.removeItem("guest_cart");
            try {
              window.dispatchEvent(new Event("guestCartChanged"));
            } catch (e) {}
          } catch (mergeErr) {
            console.warn("Guest cart merge encountered errors", mergeErr);
            localStorage.removeItem("guest_cart");
            try {
              window.dispatchEvent(new Event("guestCartChanged"));
            } catch (e) {}
          }
        }

        // Redirect handling:
        // Prefer query param value (postLoginRedirect) provided to login page.
        if (postLoginRedirect) {
          // clear legacy storage key if present to avoid confusion later
          try {
            localStorage.removeItem("postLoginRedirect");
          } catch (e) {}
          // navigate to provided path
          navigate(postLoginRedirect);
        } else {
          // legacy fallback: localStorage may have stored redirect earlier (old behavior)
          const legacy = localStorage.getItem("postLoginRedirect");
          if (legacy) {
            localStorage.removeItem("postLoginRedirect");
            navigate(legacy);
          } else {
            navigate("/");
          }
        }
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Build create-account link with current query string preserved so postLoginRedirect flows through
  const createAccountHref = `/create-account${location.search || ""}`;

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md"
        />

        {/* 👁️ Password field with eye icon */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-3 w-full pl-2 pr-10 border border-gray-200 focus:border-gray-200 rounded-md mt-3"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-2 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex justify-between w-full mt-2">
          <div className="text-start text-[#EE1c25] w-full">
            <a href="/forgot-password" className="border-b text-start">
              Forgot your password?
            </a>
          </div>

          <div className="text-end text-[#EE1c25] w-full">
            {/* preserve query params when navigating to create-account so postLoginRedirect is not lost */}
            <a href={createAccountHref} className="border-b text-end cursor-pointer">
              Create account
            </a>
          </div>
        </div>

        <div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>

      <MobileFooter />
    </div>
  );
}

export default Login;
