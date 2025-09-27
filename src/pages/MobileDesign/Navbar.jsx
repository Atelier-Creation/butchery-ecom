import React, { useEffect, useState } from "react";
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

  const clearAuthFromStorage = () => {
    // remove auth-related keys
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // reset any UI that depends on auth
    setCartCount(0);
  };

  const handleInvalidToken = (msg) => {
    // you can log msg or show a toast here if you want
    clearAuthFromStorage();
  };

  const fetchCart = async () => {
    try {
      const res = await getCartByUserId();

      // Handle various possible server shapes:
      // 1) { message: "Invalid or expired token" }
      // 2) { success: false, message: "Invalid or expired token" }
      // 3) axios error caught in catch() (handled below)
      const message =
        res?.message ?? res?.data?.message ?? (res?.data && res.data.message);

      if (
        message &&
        message.toLowerCase().includes("invalid") &&
        message.toLowerCase().includes("expired")
      ) {
        handleInvalidToken(message);
        return;
      }

      if (res?.success) {
        setCartCount(res.data?.items?.length || 0);
      } else {
        // If API didn't return success but didn't say invalid token, fallback:
        setCartCount(res?.data?.items?.length || 0);
      }
    } catch (err) {
      // If using axios / fetch, server could return error response with message
      const errMsg =
        (err?.response && (err.response.data?.message || err.response.data?.error)) ||
        err?.message ||
        "";

      if (
        typeof errMsg === "string" &&
        errMsg.toLowerCase().includes("invalid") &&
        errMsg.toLowerCase().includes("expired")
      ) {
        handleInvalidToken(errMsg);
        return;
      }

      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchCart();
  }, []);

  return (
    <header className="w-full">
      {/* Top Bar - stays mostly the same on desktop; hides on small screens */}
      <div className="bg-gray-100 text-sm py-2.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 ms-60 hidden sm:flex">
          <div className="flex items-center gap-1">
            <FaPhoneAlt size={16} />
            <span className="text-gray-600">1800-313-3903</span>
          </div>
          <div className="flex items-center gap-1">
            <IoMail size={16} />
            <span className="text-gray-600">customercare@iraichikadai.com</span>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
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
                navigate("/login");
              }
            }}
            className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full"
            aria-label="Account"
          >
            <User size={18} />
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
                  navigate("/login");
                }
              }}
              className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full"
            >
              <User className="cursor-pointer " size={18} />
            </div>

            <CartDrawer />
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
                <img src="/iraichi-logo1.svg" alt="Logo" className="h-12 w-auto" />
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
              <a href="/" onClick={() => setMobileOpen(false)} className="py-2 ">
                Home
              </a>
              <a href="/collections/all" onClick={() => setMobileOpen(false)} className="py-2 ">
                Product
              </a>
              <a href="#" onClick={() => setMobileOpen(false)} className="py-2 ">
                About Us
              </a>
              <a href="#" onClick={() => setMobileOpen(false)} className="py-2 ">
                Contact Us
              </a>
            </nav>

            <div className="mt-6 border-t pt-4">
              <button
                className="w-full text-left py-2"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  setMobileOpen(false);
                  if (token) navigate("/profile");
                  else navigate("/login");
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
      <CartDrawer />
    </header>
  );
};

export default Navbar;
