import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
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

function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top Info Bar */}
      <div className="bg-[#EE1c25] text-white text-center text-xs items-center lg:text-base font-semibold py-2 md:py-1 lg:flex lg:justify-between lg:px-10">
        <div className="hidden lg:flex items-center lg:gap-4">
          <FiFacebook size={20} />
          <FiInstagram size={20} />
          <FiYoutube size={20} />
        </div>
        <p className="text-sm lg:text-base">
          Customer Service Only in Coimbatore (For Order +91 88074 08962)
        </p>

        <select className="hidden lg:block lg:border-0 lg:border-b-2 lg:border-[#EE1c25] focus:outline-none focus:border-[#EE1c25] lg:text-sm lg:px-2 lg:py-1">
          <option className="bg-[#EE1c25] text-white">English</option>
          <option className="bg-[#EE1c25] text-white">Tamil</option>
        </select>
      </div>

      {/* Navbar */}
      <div className="flex items-center sticky top-0 justify-between bg-white px-4 py-3 shadow-md lg:relative z-50">
        {/* Left Hamburger */}
        <div className="w-20 flex justify-start lg:hidden">
          <button onClick={() => setMenuOpen(true)} className="text-xl">
            <FiMenu />
          </button>
        </div>

        {/* Logo */}
        <Link to={"/"}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-18 lg:h-24 lg:w-40 object-contain object-right"
          />
        </Link>
        <div className="lg:flex lg:w-110 lg:justify-between lg:align-middle hidden lg:relative z-100">
          <a href="/" className="hover:text-[#EE1c25] text-[#060606]">
            Home
          </a>
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

          <a href="/" className="hover:text-[#EE1c25]">
            Recipe
          </a>
          <a href="/" className="hover:text-[#EE1c25]">
            About Us
          </a>
          <a href="/" className="hover:text-[#EE1c25]">
            Contact Us
          </a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 mr-3 text-lg lg:text-2xl lg:mr-10">
          <FiSearch size={22} />
          <FiUser size={22} />
          <button onClick={() => toggleDrawer(true)}>
            <FiShoppingBag size={22} />
          </button>
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
