import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">
          The Trusted Choice for Premium Meat
        </h2>
        <p className="text-sm mb-4">
          Iraichi Kadai is the top choice for premium quality meat
        </p>
        <div className="bg-red-700 p-4 rounded-lg text-sm my-4">
          <p className="font-semibold mb-2">★ ★ ★ ★ ★</p>
          <p className="italic mb-2">"Paati-Approved Taste"</p>
          <p className="mb-1">
            I've tried many brands, but Iraichi Kadai mutton/chicken tastes just like
            the fresh chicken my paati used to cook in the village. No smell,
            tender – perfect for Sunday curries.
          </p>
          <p className="font-semibold">Revathi M, Coimbatore</p>
        </div>
      </div>

      <div className="my-8">
        <h3 className="text-center font-cursive text-2xl mb-2">Iraichi Kadai</h3>
        <p className="text-sm text-center mb-4">
          Having had very bitter experiences with the local meat shops and
          seeing that my free range Country Chicken were sold alongside the
          other poultry, I decided to bring them directly to customers. Thus the
          brand “Le Naturel Meat” came into existence!
        </p>
      </div>

      <div className="my-8">
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

      <div className="text-center text-xs mt-8">
        © 2025, Iraichi Kadai & <a href="https://www.theateliercreation.com/" target="_blank" rel="noopener noreferrer">Atelier</a> All Rights Reserved.
      </div>
    </footer>
  );
};

export default MobileFooter;
