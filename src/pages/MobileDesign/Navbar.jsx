import React, { useEffect, useState, useCallback } from "react";
import {
  Phone,
  Mail,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import LocationDropdown from "../../components/LocationDropdown";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import { useCart } from "../../components/CartDrawer/CartContext";
import { getCartByUserId } from "../../api/cartApi"; // import your API

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleDrawer } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userInitial, setUserInitial] = useState(null);

  // ---------- Guest cart helpers ----------
  const getGuestCart = useCallback(() => {
    try {
      const raw = localStorage.getItem("guest_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Error parsing guest_cart:", err);
      return [];
    }
  }, []);

  const getGuestCartCount = useCallback(() => {
    const cart = getGuestCart();
    return Array.isArray(cart) ? cart.length : 0;
  }, [getGuestCart]);

  const updateGuestCartCount = useCallback(() => {
    setCartCount(getGuestCartCount());
  }, [getGuestCartCount]);

  // ---------- User initial helpers ----------
  const updateUserInitialFromStorage = useCallback(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setUserInitial(null);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      const name = user?.name || user?.fullName || user?.username;
      if (name && typeof name === "string" && name.length > 0) {
        setUserInitial(name.charAt(0).toUpperCase());
      } else {
        setUserInitial(null);
      }
    } catch (err) {
      setUserInitial(null);
    }
  }, []);

  // ---------- Server cart fetch ----------
  const fetchCart = useCallback(async () => {
    try {
      const res = await getCartByUserId();

      // Normalize message
      const message =
        res?.message ?? res?.data?.message ?? (res?.data && res.data.message);

      if (
        message &&
        typeof message === "string" &&
        message.toLowerCase().includes("invalid") &&
        message.toLowerCase().includes("expired")
      ) {
        // token invalid/expired -> clear auth and fallback to guest cart
        clearAuthFromStorage();
        return;
      }

      // Prefer structured response: res.data.items or res.data
      if (res?.success) {
        setCartCount(res.data?.items?.length || 0);
      } else {
        setCartCount(res?.data?.items?.length ?? res?.data?.length ?? 0);
      }
    } catch (err) {
      const errMsg =
        (err?.response &&
          (err.response.data?.message || err.response.data?.error)) ||
        err?.message ||
        "";

      if (
        typeof errMsg === "string" &&
        errMsg.toLowerCase().includes("invalid") &&
        errMsg.toLowerCase().includes("expired")
      ) {
        clearAuthFromStorage();
        return;
      }

      console.error("Failed to fetch cart:", err);
      // On network error, fallback to guest cart if no token
      const token = localStorage.getItem("token");
      if (!token) {
        updateGuestCartCount();
      }
    }
  }, [updateGuestCartCount]);

  // ---------- clear auth ----------
  const clearAuthFromStorage = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // After clearing auth show guest cart count
    updateGuestCartCount();
    setUserInitial(null);
    // notify same-tab listeners
    try {
      window.dispatchEvent(new Event("authChanged"));
    } catch (e) {
      /* ignore */
    }
  }, [updateGuestCartCount]);

  // ---------- update cart count depending on auth ----------
  const updateCartCountBasedOnAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // logged-in => fetch server cart
      fetchCart();
    } else {
      // guest => read guest_cart from localStorage
      updateGuestCartCount();
    }
  }, [fetchCart, updateGuestCartCount]);

  // ---------- initial setup & listeners ----------
  useEffect(() => {
    // initialize user initial and cart count
    updateUserInitialFromStorage();
    updateCartCountBasedOnAuth();

    // storage event (other tabs)
    const onStorage = (e) => {
      // if guest_cart changed in another tab, update guest cart count
      if (!e) {
        // fallback - refresh both
        updateUserInitialFromStorage();
        updateCartCountBasedOnAuth();
        return;
      }

      if (e.key === "guest_cart") {
        updateGuestCartCount();
      } else if (e.key === "user" || e.key === "token") {
        updateUserInitialFromStorage();
        updateCartCountBasedOnAuth();
      }
    };

    // custom event for same-tab auth changes
    const onAuthChanged = () => {
      updateUserInitialFromStorage();
      updateCartCountBasedOnAuth();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, [
    updateUserInitialFromStorage,
    updateCartCountBasedOnAuth,
    updateGuestCartCount,
  ]);

  return (
    <header className="w-full">
      {/* Top Bar - stays mostly the same on desktop; hides on small screens */}
      <div className="bg-gray-100 text-sm py-2.5 px-4 flex justify-between items-center">
        <div className="lg:flex items-center gap-4 ms-60 hidden ">
          <div className="flex items-center gap-1">
            <FaPhoneAlt size={16} />
            <span className="text-gray-600">9487280241</span>
          </div>
          <div className="flex items-center gap-1">
            <IoMail size={16} />
            <span className="text-gray-600">iraichikadai@gmail.com</span>
          </div>
        </div>
        <div className="flex-1 flex justify-end mr-1">
          <LocationDropdown />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-red-600 text-white px-6 flex items-center justify-between relative">
        {/* Desktop Logo (unchanged) */}
        <div
          className="absolute -top-2.0 left-10 z-50 hidden md:block cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/iraichi-logo1.svg" alt="Logo" className="h-39 w-auto" />
        </div>

        {/* --- MOBILE: left (menu), centered logo, right (cart + account) --- */}

        {/* Mobile Left: hamburger (absolute so it doesn't push center logo) */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 md:hidden z-50">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Mobile Centered Logo */}
        <div className="flex items-center ml-10  w-full md:hidden h-14 relative overflow-visible">
          <div
            className="cursor-pointer z-40 "
            onClick={() => navigate("/")}
            aria-label="Go to home"
          >
            {/* make logo bigger on mobile; header height remains same (h-14) */}
            <img
              src="/iraichi-logo1.svg"
              alt="Logo"
              className="h-28 w-auto object-contain -mt-3"
            />
          </div>
        </div>

        {/* Mobile Right: cart + account */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden flex items-center gap-3 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDrawer(true);
            }}
            aria-label="Open cart"
            className="relative p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full"
          >
            <MdOutlineShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/profile");
              } else {
                localStorage.setItem(
                  "postLoginRedirect",
                  JSON.stringify({
                    path: window.location.pathname,
                  })
                );
                navigate("/login");
              }
            }}
            className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full"
            aria-label="Account"
          >
            {/* show initial if logged in, else default icon */}
            {userInitial ? (
              <div className="w-5 h-5 flex items-center justify-center rounded-full text-[#ffffff] font-bold">
                {userInitial}
              </div>
            ) : (
              <User size={18} />
            )}
          </button>
        </div>

        {/* Desktop spacer to keep same visual as before (keeps your existing layout intact) */}
        <div className="hidden md:block py-2 ps-15">
          <div className="h-12 w-auto" />
        </div>

        {/* Desktop menu + icons */}
        <div className="hidden md:flex items-center gap-10">
          {/* Menu Links */}
          <nav className="flex gap-12 font-medium">
            <a
              href="/"
              className="relative font-medium pb-2 border-[#FFEF8C]  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-300 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Home
            </a>
            <a
              href="/collections/all"
              className="relative font-medium pb-2  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-300 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Product
            </a>
            <a
              href="#"
              className="relative font-medium pb-2  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-300 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              About Us
            </a>
            <a
              href="#"
              className="relative font-medium pb-2  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-300 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Contact Us
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <div className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full">
              <Search className="cursor-pointer " size={18} />
            </div>

            {/* Shopping Bag with Cart Count */}
            <div
              onClick={() => toggleDrawer(true)}
              className="relative p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full cursor-pointer"
            >
              <MdOutlineShoppingBag className="cursor-pointer " size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                const token = localStorage.getItem("token");
                if (token) {
                  navigate("/profile");
                } else {
                  localStorage.setItem(
                    "postLoginRedirect",
                    JSON.stringify({
                      path: window.location.pathname,
                    })
                  );
                  navigate("/login");
                }
              }}
              className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full cursor-pointer"
            >
              {/* show initial if logged in, else default icon */}
              {userInitial ? (
                <div className="w-5 h-5 flex items-center justify-center rounded-full  text-[#ffffff] font-bold">
                  {userInitial}
                </div>
              ) : (
                <User className="cursor-pointer " size={18} />
              )}
            </div>

            <CartDrawer onCartChange={updateCartCountBasedOnAuth} />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-xs bg-white text-gray-900 p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/");
                }}
                className="cursor-pointer"
              >
                <img
                  src="/iraichi-logo1.svg"
                  alt="Logo"
                  className="h-12 w-auto"
                />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <FiX size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 font-medium">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className="py-2 "
              >
                Home
              </a>
              <a
                href="/collections/all"
                onClick={() => setMobileOpen(false)}
                className="py-2 "
              >
                Product
              </a>
              {/* <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="py-2 "
              >
                About Us
              </a>
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="py-2 "
              >
                Contact Us
              </a> */}
            </nav>

            <div className="mt-6 absolute bottom-5 pt-4">
              <button
                className="w-full text-left py-2"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  setMobileOpen(false);
                  if (token) navigate("/profile");
                  else {
                    localStorage.setItem(
                      "postLoginRedirect",
                      JSON.stringify({
                        path: window.location.pathname,
                      })
                    );
                    navigate("/login");
                  }
                }}
              >
                My Account
              </button>
              <button
                className="w-full text-left py-2"
                onClick={() => {
                  toggleDrawer(true);
                  setMobileOpen(false);
                }}
              >
                Cart ({cartCount})
              </button>
              <div className="mt-4">
                <LocationDropdown />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ensure CartDrawer is available on all viewports */}
      <CartDrawer onCartChange={updateCartCountBasedOnAuth} />
    </header>
  );
};

export default Navbar;
