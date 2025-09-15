import React from "react";
import {
  Phone,
  Mail,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp, IoMail } from "react-icons/io5";
import LocationDropdown from "../../components/LocationDropdown";
import { useCart } from "../../components/CartDrawer/CartContext";
const Navbar = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, addToCart, toggleDrawer } = useCart();
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-100 text-sm py-2.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 ms-60">
          <div className="flex items-center gap-1">
            <FaPhoneAlt  size={16} />
            <span className="text-gray-600">1800-313-3903</span>
          </div>
          <div className="flex items-center gap-1">
            <IoMail  size={16} />
            <span className="text-gray-600">customercare@iraichikadai.com</span>
          </div>
        </div>
        {/* <div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:underline me-6 inline-flex items-center gap-1text-gray-800"
          >
           <IoLocationSharp size={20} color="#E41D25" />  Coimbatore <ChevronDown size={14} />
          </button>
        </div> */}
        <LocationDropdown/>
      </div>

      {/* Main Navbar */}
      <div className="bg-red-600 text-white px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="absolute -top-2.0 left-10 z-100">
          <img
            src="/iraichi-logo1.svg" // replace with your logo path
            alt="Logo"
            className="h-39 w-auto"
          />
        </div>
        <div className="py-2 ps-15">
          <img
            src="" // replace with your logo path
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="flex gap-10">
          {/* Menu Links */}
          <nav className="flex gap-12 font-medium">
            <a
              href="/"
              className="relative font-medium pb-2 border-[#FFEF8C]  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-yellow-300 after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Home
            </a>
            <a
              href="#"
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
              <Search
                className="cursor-pointer "
                size={18}
              />
            </div>
            <div   onClick={(e) => {
    e.stopPropagation(); // prevent bubbling
    toggleDrawer(true);
    console.log("clicked icon")
  }} className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full">
              <MdOutlineShoppingBag
                className="cursor-pointer "
                size={18}
              />
            </div>
            <div   onClick={(e) => {
    e.stopPropagation(); // stop event bubbling
    navigate("/login");
  }} className="p-2 bg-[#BC141B91] border border-[#FFFFFF30] rounded-full">
              <User className="cursor-pointer " size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
