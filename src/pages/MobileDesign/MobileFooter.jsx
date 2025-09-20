import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/Untitled/42621686_9008027 1-cropped.svg";
import rectBg from "../../assets/images/Untitled/Rectangle 203.svg";

const FooterSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-white font-semibold text-base sm:text-lg mb-2"
      >
        {title}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && (
        <div className="pl-2 text-white text-sm sm:text-base">{children}</div>
      )}
    </div>
  );
};

const MobileFooter = () => {
  return (
    <footer className="relative pt-12 text-white z-10 mt-20 sm:mt-28 lg:mt-40 bg-[#222222]">
      {/* Background for top wave */}
      <div className="absolute -top-10 lg:-top-50 left-0 w-full">
        <img src={bgImage} alt="bg" className="w-full object-cover" />
      </div>
      {/* <div className="absolute top-0 left-0 w-full">
        <img src={rectBg} alt="rect-bg" className="w-full h-[65vh] object-cover" />
      </div> */}
      {/* Mobile Section */}
      <div className="my-8 lg:hidden flex flex-col items-center justify-center px-4 gap-4">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-16 sm:h-38 object-contain"
          />
        </Link>
        <p className="text-sm text-center leading-relaxed">
          Having had very bitter experiences with the local meat shops and
          seeing that my free range Country Chicken were sold alongside the
          other poultry, I decided to bring them directly to customers. Thus the
          brand “Le Naturel Meat” came into existence!
        </p>
      </div>

      <div className="my-8 lg:hidden px-4">
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

      {/* Desktop Section */}
      <div className="hidden relative lg:flex justify-around lg:mt-10 lg:pb-10 px-10">
        <div className="absolute top-0 left-0 w-full">
          <img src={rectBg} alt="rect-bg" className="w-full object-cover" />
        </div>
        <div className="w-80 z-10">
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Link to={"/"}>
              <img
                src="/ik-white.svg"
                alt="Logo"
                className="h-20 lg:h-38 object-contain"
              />
            </Link>
            <div className="flex gap-4">
              <img src="/fssai-logo.png" alt="fssai" className="h-14" />
              <img src="/gov-approved-msme.png" alt="msme" className="h-10" />
            </div>
          </div>
          <p className="text-sm text-start leading-relaxed">
            Having had very bitter experiences with the local meat shops and
            seeing that my free range Country Chicken were sold alongside the
            other poultry, I decided to bring them directly to customers. Thus
            the brand “Le Naturel Meat” came into existence!
          </p>
        </div>

        {/* Links */}
        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-xl font-semibold">Quick Links</h4>
          <a href="/" className="hover:underline">
            Search
          </a>
          <a href="/" className="hover:underline">
            Product Link
          </a>
          <a href="/" className="hover:underline">
            Contact Us
          </a>
          <a href="/" className="hover:underline">
            Special Product
          </a>
          <a href="/" className="hover:underline">
            Recipe
          </a>
        </div>

        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-xl font-semibold">Policies</h4>
          <a href="/" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/" className="hover:underline">
            Terms of Service
          </a>
          <a href="/" className="hover:underline">
            Shipping policy
          </a>
          <a href="/" className="hover:underline">
            Return & Refund policy
          </a>
        </div>

        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-xl font-semibold">Settings</h4>
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/" className="hover:underline">
            Meat-Product
          </a>
          <a href="/" className="hover:underline">
            Recipe
          </a>
          <a href="/" className="hover:underline">
            About us
          </a>
          <a href="/" className="hover:underline">
            Contact us
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 text-center bg-[#222] py-2 text-gray-300 text-xs sm:text-sm lg:text-base">
        © 2025, Iraichi Kadai &{" "}
        <a
          href="https://www.theateliercreation.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Atelier
        </a>{" "}
        All Rights Reserved.
      </div>

      {/* Background bottom wave */}
      {/* <div className="absolute bottom-0 left-0 w-full">
        <img
          src={rectBg}
          alt="rect-bg"
          className="w-full h-[68vh] lg:h-full object-cover"
        />
      </div> */}
    </footer>
  );
};

export default MobileFooter;
