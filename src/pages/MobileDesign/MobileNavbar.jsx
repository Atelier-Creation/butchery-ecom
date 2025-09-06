import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden w-full">
      {/* Top Info Bar */}
      <div className="bg-red-700 text-white text-center text-xs font-semibold py-2">
        Customer Service Only in Coimbatore (For Order +91 88074 08962)
      </div>

      {/* Navbar */}
      <div className="flex items-cente sticky top-0 justify-between bg-[#ffeee8] px-4 py-3 shadow-md">
        {/* Left Hamburger */}
        <div className="w-20 flex justify-start">
          <button onClick={() => setMenuOpen(true)} className="text-xl">
            <FiMenu />
          </button>
        </div>

        {/* Logo */}
        <img src="/logo.svg" alt="Logo" className="h-18 object-contain" />

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-lg">
          <FiSearch />
          <FiUser />
          <FiShoppingBag />
        </div>
      </div>

      {/* Slide Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#fff3d6] z-50 transition-transform duration-300 ${
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
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <div className="flex justify-between items-center">
            <a href="#" className="hover:text-red-700">
              Meat-Product
            </a>
            <span className="text-gray-600">→</span>
          </div>
          <a href="#" className="hover:text-red-700">
            Recipe
          </a>
          <a href="#" className="hover:text-red-700">
            About Us
          </a>
          <a href="#" className="hover:text-red-700">
            Contact Us
          </a>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full bg-[#fff1d0] p-4 border-t">
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
  );
}

export default MobileNavbar;
