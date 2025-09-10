import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FiStar } from "react-icons/fi";
const footerGridData = [
  {starCount : "4",
  head : "Paati-Approved Taste",
  comment :`            I've tried many brands, but LeNaturel mutton/chicken tastes just like
  the fresh chicken my paati used to cook in the village. No smell,
  tender – perfect for Sunday curries.`,
  name : "Revathi",
  place : "Coimbatore"
  },
  {starCount : "5",
  head : "Paati-Approved Taste",
  comment :`            I've tried many brands, but LeNaturel mutton/chicken tastes just like
  the fresh chicken my paati used to cook in the village. No smell,
  tender – perfect for Sunday curries.`,
  name : "Revathi",
  place : "Coimbatore"
  },
  {starCount : "4",
  head : "Paati-Approved Taste",
  comment :`            I've tried many brands, but LeNaturel mutton/chicken tastes just like
  the fresh chicken my paati used to cook in the village. No smell,
  tender – perfect for Sunday curries.`,
  name : "Revathi",
  place : "Coimbatore"
  },
]
const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full text-white font-semibold text-lg mb-2"
      >
        {title}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="pl-2 text-white text-sm">{children}</div>}
    </div>
  );
};

const MobileFooter = () => {
  return (
    <footer className="bg-red-800 px-5 py-8 text-white">
      <div className="mb-8 ">
        <h2 className="text-xl font-bold mb-2 lg:text-4xl lg:font-semibold">
          The Trusted Choice for Premium Meat
        </h2>
        <p className="text-sm mb-4 lg:text-lg lg:font-semibold">
          Iraichi Kadai is the top choice for premium quality meat
        </p>
        <div className="bg-red-700 p-4 rounded-lg text-sm my-4 lg:hidden">
          <p className="font-semibold mb-2">★ ★ ★ ★ ★</p>
          <p className="italic mb-2">"Paati-Approved Taste"</p>
          <p className="mb-1">
            I've tried many brands, but Iraichi Kadai mutton/chicken tastes just like
            the fresh chicken my paati used to cook in the village. No smell,
            tender – perfect for Sunday curries.
          </p>
          <p className="font-semibold">Revathi M, Coimbatore</p>
        </div>

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-15">
          {footerGridData.map((data,index)=>(
            <div className="border border-white rounded-lg flex flex-col gap-3 p-4">
              <FiStar/>
              <p className="text-lg font-semibold">"{data.head}"</p>
              <p className="text-lg font-semibold">{data.comment}</p>
              <p className="text-lg font-semibold">{data.name}</p>
              <p className="text-lg font-semibold">{data.place}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-8 lg:hidden">
        <h3 className="text-center font-cursive text-2xl mb-2">Iraichi Kadai</h3>
        <p className="text-sm text-center mb-4">
          Having had very bitter experiences with the local meat shops and
          seeing that my free range Country Chicken were sold alongside the
          other poultry, I decided to bring them directly to customers. Thus the
          brand “Le Naturel Meat” came into existence!
        </p>
      </div>

      <div className="my-8 lg:hidden">
        <FooterSection title="Quick Links">
          <ul className="space-y-1">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </FooterSection>

        <FooterSection title="Policies">
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Refund Policy</li>
          </ul>
        </FooterSection>

        <FooterSection title="Settings">
          <ul className="space-y-1">
            <li>Account</li>
            <li>Language</li>
            <li>Notifications</li>
          </ul>
        </FooterSection>
      </div>
      <div className="hidden lg:flex justify-around lg:mt-20 lg:pb-20 lg:border-b border-white">
      <div className="w-80">
        <h3 className="text-start font-cursive text-2xl font-semibold mb-2">Iraichi Kadai</h3>
        <p className="text-sm text-start mb-4 font-semibold">
          Having had very bitter experiences with the local meat shops and
          seeing that my free range Country Chicken were sold alongside the
          other poultry, I decided to bring them directly to customers. Thus the
          brand “Le Naturel Meat” came into existence!
        </p>
      </div>
      <div className="lg:flex flex-col gap-2">
      
      <h4 className="text-2xl font-semibold">Quick Links</h4>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Search</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Product Link</a>
            <a href="/"className="font-semibold hover:border-b-1 w-fit">Contact Us</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Special Product</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Recipe</a>
      </div>
      <div className="lg:flex flex-col gap-2">
      
      <h4 className="text-2xl font-semibold">Policies</h4>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Privacy Policy</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Terms of Service</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Shipping policy</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Return and refund policy</a>
      </div>
      <div className="lg:flex flex-col gap-2">
      
      <h4 className="text-2xl font-semibold">Settings</h4>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Home</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Meat-Product</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Recipe</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">About us</a>
            <a href="/" className="font-semibold hover:border-b-1 w-fit">Contact us</a>
      </div>
      </div>

      <div className="text-center text-xs mt-8 lg:text-base lg:font-semibold">
        © 2025, Iraichi Kadai & <a href="https://www.theateliercreation.com/" target="_blank" rel="noopener noreferrer">Atelier</a> All Rights Reserved.
      </div>
    </footer>
  );
};

export default MobileFooter;
