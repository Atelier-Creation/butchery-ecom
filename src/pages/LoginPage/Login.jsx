import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileFooter from "../MobileDesign/MobileFooter";
import Navbar from "../MobileDesign/Navbar";
import { loginUser } from "../../api/authApi";
import { addToCartAPI } from "../../api/cartApi";
import { getProducts } from "../../api/productApi";
import { Eye, EyeClosed } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [productsCache, setProductsCache] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(()=>{
    document.title = "Login - Iraichi Kadai";
    const token = localStorage.getItem("token");
    console.log("Existing token:", token);
    if(token){
      navigate("/", { replace: true });
    }
  })
  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle redirect after login
  const query = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const paramRedirect = query.get("postLoginRedirect");
  const [postLoginRedirect] = useState(paramRedirect || localStorage.getItem("postLoginRedirect") || null);

  // Load products for SKU -> _id resolution
  const loadProductsCache = useCallback(async () => {
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
  }, [productsCache]);

  const getGuestCart = useCallback(() => {
    try {
      const raw = localStorage.getItem("guest_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Failed to parse guest_cart", err);
      return [];
    }
  }, []);

  const isObjectId = (id) => typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);

  const resolveProductObjectId = async (identifier) => {
    if (!identifier) return null;
    if (isObjectId(identifier)) return identifier;

    const products = await loadProductsCache();
    const norm = (s) => (s || "").toString().toLowerCase().trim();
    const idLower = norm(identifier);

    const found = products.find((p) => {
      if (!p) return false;
      return (
        (isObjectId(p._id) && p._id === identifier) ||
        (p.productId && norm(p.productId) === idLower) ||
        (p.id && norm(p.id) === idLower) ||
        (p.SKU && norm(p.SKU) === idLower) ||
        (p.sku && norm(p.sku) === idLower) ||
        (p.name && norm(p.name) === idLower) ||
        (p.tamilName && norm(p.tamilName) === idLower) ||
        (p.slug && norm(p.slug) === idLower)
      );
    });

    return found?._id || null;
  };

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
          errors.push({ item, reason: `Could not resolve product id for "${rawPid ?? "unknown"}"` });
          continue;
        }

        await addToCartAPI(productId, quantity, price, weightOptionId);
        successCount++;
      } catch (err) {
        failCount++;
        errors.push({ item, err: err?.message || err });
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
      // ✅ Save login data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // ✅ Merge guest cart if exists
      const guestCart = getGuestCart();
      if (guestCart && guestCart.length > 0) {
        try {
          await mergeGuestCartToServer();
        } catch {
          // Even if merging fails, clear guest cart to avoid duplication
        } finally {
          localStorage.removeItem("guest_cart");
          window.dispatchEvent(new Event("guestCartChanged"));
        }
      }

      // ✅ Get post-login redirect info (path + modal)
      const savedRedirect = JSON.parse(localStorage.getItem("postLoginRedirect") || "{}");
      localStorage.removeItem("postLoginRedirect"); // Clear after using

      // ✅ Show login success modal
      setShowLoginModal(true);

      setTimeout(() => {
        setShowLoginModal(false);

        // Default redirect path
        const redirectPath = savedRedirect?.path || "/";

        // Redirect user
        navigate(redirectPath, { replace: true });

        // ✅ Reopen modal if needed
        if (savedRedirect?.modal) {
          window.dispatchEvent(
            new CustomEvent("reopenModalAfterLogin", { detail: savedRedirect.modal })
          );
        }
      }, 2000);
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

      {/* Bright Login Modal */}
      {showLoginModal && (
        <div className="bright-modal-root fixed inset-0 flex items-center justify-center z-50" aria-live="polite">
          <div className="bright-modal-backdrop" />
          <div className="bright-modal-card">
            <div className="bright-top">
              <div className="bright-badge">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.06)" />
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="bright-body">
              <h3 className="bright-title">Signed in</h3>
              <p className="bright-desc">
                You have successfully logged in. Redirecting...
                <span className="bright-dots"> • • •</span>
              </p>
            </div>
          </div>

          <style>{`
            :root { --accent1: #00ff0dff; --accent2: #75ff66ff; }
            .bright-modal-root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
            .bright-modal-backdrop { position: absolute; inset:0; background: radial-gradient(circle at 10% 10%, rgba(255,95,109,0.06), transparent 18%), radial-gradient(circle at 90% 90%, rgba(255,217,102,0.04), transparent 22%), rgba(4,6,12,0.62); backdrop-filter: blur(6px) saturate(1.12); }
            .bright-modal-card { position: relative; z-index: 12; width: 360px; max-width: calc(100% - 36px); background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border-radius: 16px; padding: 18px; display:flex; align-items:center; gap:14px; box-shadow:0 18px 40px rgba(20,28,40,0.6), 0 4px 18px rgba(255,149,97,0.06); border:1px solid rgba(255,255,255,0.04); animation: brightPop 260ms cubic-bezier(.2,.95,.2,1); }
            @keyframes brightPop { from { opacity:0; transform:translateY(-12px) scale(.98) } to { opacity:1; transform:translateY(0) scale(1) } }
            .bright-top { display:flex; flex-direction: column; align-items:center; gap:12px; }
            .bright-badge { width:74px; height:74px; border-radius:999px; display:grid; place-items:center; background:linear-gradient(180deg,var(--accent1),var(--accent2)); box-shadow:0 10px 28px rgba(255,121,97,0.18),0 0 30px rgba(255,153,102,0.12),inset 0 -6px 18px rgba(255,255,255,0.06); border:2px solid rgba(255,255,255,0.08); }
            .bright-body { flex:1; padding-left:8px; }
            .bright-title { margin:0; font-size:19px; font-weight:700; color:white; text-shadow:0 6px 18px rgba(0,0,0,0.45); letter-spacing:0.2px; }
            .bright-desc { margin:6px 0 0; font-size:13px; color:rgba(255,255,255,0.92); opacity:0.95; }
            .bright-dots { margin-left:8px; color: rgba(255,255,255,0.9); animation:dotsBright 2s steps(3,end) infinite; }
            @keyframes dotsBright { 0% { content:'•'} 33% { content:'• •'} 66% { content:'• • •'} 100% { content:'•'} }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default Login;
