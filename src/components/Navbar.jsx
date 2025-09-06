import {
  Phone,
  Search,
  User,
  ShoppingCart,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import InfoBanner from "./InfoBanner";
import { FaPhoneAlt } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <InfoBanner />
      <nav className="absolute top-10 left-0 w-full z-50 bg-transparent text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 relative">
          {/* Hamburger Menu (Mobile Only) */}
          <div className="md:hidden flex items-center">
            <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          </div>

          {/* Left Menu (Desktop Only) */}
          <ul className="hidden md:flex items-center gap-6 font-semibold text-sm uppercase">
            <li className="text-red-700 border-b-2 border-red-700 pb-1">
              Home
            </li>
            <li className="hover:text-red-700 cursor-pointer">About</li>
            <li className="hover:text-red-700 cursor-pointer">Shop</li>
            <li className="hover:text-red-700 cursor-pointer">Pages</li>
            <li className="hover:text-red-700 cursor-pointer">Blog</li>
            <li className="hover:text-red-700 cursor-pointer">Contact</li>
          </ul>

          {/* Logo (Centered on mobile) */}
          {/* <div className="flex-grow-0 md:flex-grow flex justify-center ">
            <img
              src="/ik-logo.svg"
              alt="Logo"
              className="w-40 md:w-60 h-25 object-contain "
            />
          </div> */}
          <div className="flex-grow-0 md:flex-grow flex justify-center ">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-40 md:w-30 h-auto object-contain bg-white rounded-full p-2"
            />
          </div>

          {/* Right Menu (Desktop Only) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Phone Section */}
            <a
              href="tel:+919045678900"
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaPhoneAlt className="w-5 h-5" />
              <div className="leading-tight text-sm">
                <p className="text-gray-300">Give us a call</p>
                <p className="font-medium mt-0.5">+91 90456 78900</p>
              </div>
            </a>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 cursor-pointer hover:text-red-700">
                <Search className=" w-5 h-5" />
                <span className="text-sm">Search</span>
              </div>
              <User className=" w-5 h-5 cursor-pointer hover:text-red-700" />
              <ShoppingCart className=" w-5 h-5 cursor-pointer hover:text-red-700" />
              <Settings className=" w-5 h-5 cursor-pointer hover:text-red-700" />
            </div>
          </div>

          {/* Mobile Cart Icon (Mobile Only) */}
          <div className="md:hidden flex items-center">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-90 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full items-center justify-between p-6">
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex-grow-0 md:flex-grow flex justify-center md:justify-start">
            <img
              src="/logo-white.svg"
              alt="Logo"
              className="w-40 md:w-50 h-auto mt-10 object-cover"
            />
          </div>
          <ul className="flex flex-col items-center gap-6 text-xl font-bold uppercase">
            <li className="text-red-700 border-b-2 border-red-700 pb-1">
              Home
            </li>
            <li className="hover:text-red-700 text-gray-100 cursor-pointer">
              About
            </li>
            <li className="hover:text-red-700 text-gray-100 cursor-pointer">
              Shop
            </li>
            <li className="hover:text-red-700 text-gray-100 cursor-pointer">
              Pages
            </li>
            <li className="hover:text-red-700 text-gray-100 cursor-pointer">
              Blog
            </li>
            <li className="hover:text-red-700 text-gray-100 cursor-pointer">
              Contact
            </li>
          </ul>
          <p className="text-xs text-gray-300">
            All rights reserved to{" "}
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 no-underline"
            >
              Atelier
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
