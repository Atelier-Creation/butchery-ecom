import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function InfoBanner({
  text = [
    "Free shipping on orders over ₹500! Don’t miss out on this exclusive deal available for a limited time only!",
    "New arrivals just dropped! Explore our latest collection and upgrade your style today.",
    "Flat 20% off on first order! Use code WELCOME20 at checkout.",
  ],
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % text.length);
    }, 2500); // change every 10s to match marquee duration
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="w-full bg-[#b41f25] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4 text-sm font-semibold">
        
        {/* Left: Social Icons */}
        {/* <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="w-4 h-4 hover:text-gray-200 cursor-pointer" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <AiFillInstagram className="w-4 h-4 hover:text-gray-200 cursor-pointer" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedinIn className="w-4 h-4 hover:text-gray-200 cursor-pointer" />
          </a>
        </div> */}

        {/* Center: Marquee Text */}
        <div className="relative flex-1 mx-6 overflow-hidden text-center">
          <p
            key={index}
            className="text-sm font-semibold whitespace-nowrap animate-marquee"
          >
            {text[index]}
          </p>
        </div>

        {/* Right: Phone */}
        {/* <a href="tel:+919045678900" className="flex items-center gap-2">
          <FaPhoneAlt className="w-4 h-4" />
          <span className="font-bold">+91 90456 78900</span>
        </a> */}
      </div>
    </div>
  );
}
