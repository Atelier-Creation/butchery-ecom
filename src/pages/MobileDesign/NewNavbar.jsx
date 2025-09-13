import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaMailBulk, FaMobile, FaPhone, FaSearch, FaYoutube } from "react-icons/fa";
import {
  FiMenu,
  FiChevronDown,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import CartDrawer from "../../components/CartDrawer/CartDrawer"; // ✅ adjust path
import { useCart } from "../../components/CartDrawer/CartContext";
function NewNavbar() {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
      // ✅ state for cart drawer
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ get cart items from context
  const { cartItems, removeFromCart, addToCart } = useCart();
  return (
<div className="relative w-full">
  {/* Navbar wrapper */}
  <div className="flex gap-5 items-start justify-between w-full bg-gray-100 border-b border-gray-200 relative z-10 ">
    
    {/* Logo with V shape */}
<div className="[box-shadow:0_4px_8px_rgba(0,0,0,0.9),4px_0_8px_rgba(0,0,0,0.9),-4px_0_8px_rgba(0,0,0,0.9)]">
  <div className="z-50 md:ml-15 lg:ml-20 relative -mb-8 inline-block bg-white px-3 py-6
    [clip-path:polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)]">
    <Link to={'/'}>
      <img src="/logo.svg" alt="Logo" className="h-16 lg:h-30 object-cover" />
    </Link>
  </div>
</div>




    {/* Right side content */}
    <div className="flex flex-col w-full pt-2">
        <div className='flex justify-between w-full'>
      <div className="flex items-center gap-6 text-sm py-2 px-4">
        <span className="flex items-center gap-2 text-base">
          <FaMailBulk /> example@gmail.com
        </span>
        <span className="flex items-center gap-2 text-base">
          <FaMobile /> +91 9876543210
        </span>
      </div>
      <div className="hidden lg:flex items-center lg:gap-4 lg:mr-10 text-xl">
          <FiFacebook size={18}/>
          <FiInstagram size={18} />
          <FiYoutube size={18} />
        </div>
      </div>
      <div className='border-b border-white w-full'></div>
      <div className="flex items-center justify-between px-4 py-3">
        
      <div className="lg:flex lg:w-110 lg:justify-between lg:align-middle hidden lg:relative z-100">
          <a href="/" className="hover:text-[#EE1c25] text-[#060606]">Home</a>
          <div className="relative z-100">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex gap-2 items-center hover:text-[#EE1c25]"
            >
              <p>Meat-Product</p>
              <FiChevronDown
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-40 shadow-md rounded border-0 z-100  bg-[#f8f6f5]"
                style={{ backgroundColor: "#f8f6f5" }}
              >
                <a
                  href="/collections/chicken"
                  className="block px-4 py-2 hover:bg-red-600 hover:text-white"
                >
                  Chicken
                </a>
                <a
                  href="/collections/mutton"
                  className="block px-4 py-2 hover:bg-red-600 hover:text-white"
                >
                  Mutton
                </a>
                <a
                  href="/collections/fish"
                  className="block px-4 py-2 hover:bg-red-600 hover:text-white"
                >
                  Fish
                </a>
              </div>
            )}
          </div>

          <a href="/" className="hover:text-[#EE1c25]">Recipe</a>
          <a href="/" className="hover:text-[#EE1c25]">About Us</a>
          <a href="/" className="hover:text-[#EE1c25]">Contact Us</a>
        </div>
        <div className="w-20 flex justify-start lg:hidden">
          <button onClick={() => setMenuOpen(true)} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <div className="flex gap-4 text-xl lg:mr-5">
          <FiSearch />
          <button onClick={()=>navigate('/login')}>
          <FiUser />
          </button>
          <button onClick={() => setCartOpen(true)}>
                <FiShoppingBag />
              </button>
        </div>

        <CartDrawer
        show={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onAddToCart={addToCart}
      />
        <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close + Logo */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => setMenuOpen(false)} className="text-xl">
            <FiX />
          </button>
          <img
            src="/ik-logo-black.svg"
            alt="Le Naturel"
            className="h-10 object-contain"
          />
          <FiShoppingBag />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4 p-4 text-lg font-medium">
          <a href="#" className="hover:text-[#EE1c25]">
            Home
          </a>
          <div className="flex justify-between items-center">
            <a href="#" className="hover:text-[#EE1c25]">
              Meat-Product
            </a>
            <span className="text-gray-600">→</span>
          </div>
          <a href="#" className="hover:text-[#EE1c25]">
            Recipe
          </a>
          <a href="#" className="hover:text-[#EE1c25]">
            About Us
          </a>
          <a href="#" className="hover:text-[#EE1c25]">
            Contact Us
          </a>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-white p-4 border-t">
          <button className="flex items-center gap-2 mb-3">
            <FiUser /> Log in
          </button>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-blue-600" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaYoutube className="cursor-pointer hover:text-red-600" />
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default NewNavbar
