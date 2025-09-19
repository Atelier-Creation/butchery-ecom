import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/Untitled/42621686_9008027 1-cropped.svg";
import rectBg from "../../assets/images/Untitled/Rectangle 203.svg";

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
    <footer className="relative pt-8 text-white z-10 mt-40">
      <div className="absolute -top-45 left-0 w-full">
        <img src={bgImage} className="w-full object-cover" />
      </div>

      <div className="my-8 lg:hidden flex flex-col items-center justify-center gap-2">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-18 lg:h-24 lg:w-40 object-contain object-right"
          />
        </Link>
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
      <div className="hidden relative lg:flex justify-around lg:mt-10 lg:pb-10 lg:border-b border-white">
        <div className="absolute top-0 left-0 w-full">
          <img src={rectBg} className="w-full object-cover" />
        </div>
        <div className="w-80 z-10">
          <div className="relative z-50 md:ml-15 lg:ml-20 inline-block mb-5">
            {/* Black glow behind polygon */}
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute inset-0 
      bg-black opacity-40
      blur-[40px] scale-[1]"
              ></div>
            </div>

            {/* White polygon in front */}
            <div
              className="[clip-path:polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)] 
      bg-white px-3 py-6 relative z-10"
            >
              <Link to={"/"}>
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-16 lg:h-20 object-cover"
                />
              </Link>
            </div>
          </div>
          <div className="flex gap-5 -mt-5 mb-3 items-center justify-center">
            <img src="/fssai-logo.png" alt="fssai" className="h-20" />
            <img
              src="/public/gov-approved-msme.png"
              alt="msme"
              className="h-10"
            />
          </div>
          <p className="text-sm text-start mb-4">
            Having had very bitter experiences with the local meat shops and
            seeing that my free range Country Chicken were sold alongside the
            other poultry, I decided to bring them directly to customers. Thus
            the brand “Le Naturel Meat” came into existence!
          </p>
        </div>
        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-2xl font-semibold">Quick Links</h4>
          <a href="/" className=" hover:border-b-1 w-fit">
            Search
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Product Link
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Contact Us
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Special Product
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Recipe
          </a>
        </div>
        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-2xl font-semibold">Policies</h4>
          <a href="/" className=" hover:border-b-1 w-fit">
            Privacy Policy
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Terms of Service
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Shipping policy
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Return and refund policy
          </a>
        </div>
        <div className="lg:flex flex-col gap-2 z-10">
          <h4 className="text-2xl font-semibold">Settings</h4>
          <a href="/" className=" hover:border-b-1 w-fit">
            Home
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Meat-Product
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Recipe
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            About us
          </a>
          <a href="/" className=" hover:border-b-1 w-fit">
            Contact us
          </a>
        </div>
      </div>

      <div className="relative z-10 text-center bg-[#222] py-1 text-gray-300 text-xs lg:text-base ">
        © 2025, Iraichi Kadai &{" "}
        <a
          href="https://www.theateliercreation.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Atelier
        </a>{" "}
        All Rights Reserved.
      </div>
      <div className="absolute bottom-0 left-0 w-full h-100">
        <img src={rectBg} className="w-full object-cover" />
      </div>
    </footer>
  );
};

export default MobileFooter;
