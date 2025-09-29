import React, { useState, useRef, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { ChevronDown, X } from "lucide-react";

const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivagangai", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

const LocationDropdown = ({ menuDirection = "down" }) => {
  const [selected, setSelected] = useState("Coimbatore");
  const [open, setOpen] = useState(false);
  const [effectiveDirection, setEffectiveDirection] = useState(menuDirection);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smart flip direction based on viewport space
  useEffect(() => {
    if (!open) return;

    const buttonRect = dropdownRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const menuH = 256; // ~16rem
    const menuW = 192; // ~12rem

    let newDirection = menuDirection;

    if (menuDirection === "down" && buttonRect.bottom + menuH > vh) {
      newDirection = "up";
    } else if (menuDirection === "up" && buttonRect.top - menuH < 0) {
      newDirection = "down";
    } else if (menuDirection === "right" && buttonRect.right + menuW > vw) {
      newDirection = "left";
    } else if (menuDirection === "left" && buttonRect.left - menuW < 0) {
      newDirection = "right";
    }

    setEffectiveDirection(newDirection);
  }, [open, menuDirection]);

  const positionClasses = {
    down: "top-full mt-2 -left-15 lg:-left-14",
    up: "bottom-full mb-2 left-0",
    right: "left-full ml-2 top-0",
    left: "right-full mr-2 top-0",
  };

  const handleSelect = (district) => {
    setOpen(false);

    if (district !== "Coimbatore") {
      setShowModal(true);
    } else {
      setSelected("Coimbatore");
    }
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {/* Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 text-gray-800 hover:text-red-600 font-medium"
        >
          <IoLocationSharp size={20} color="#E41D25" />
          {selected}
          <ChevronDown
            size={16}
            className={`${open ? "rotate-180" : ""} transition-transform`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={`absolute ${positionClasses[effectiveDirection]} w-48 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-gray-400 ring-opacity-5 z-60`}
          >
            <ul className="py-1 text-sm text-gray-700">
              {districts.map((district) => (
                <li key={district}>
                  <button
                    onClick={() => handleSelect(district)}
                    className={`block w-full text-left px-4 py-2 hover:bg-red-50 ${
                      selected === district ? "bg-red-100 text-red-600" : ""
                    }`}
                  >
                    {district}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ❗ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="text-center">
              <IoLocationSharp
                size={40}
                color="#E41D25"
                className="mx-auto mb-3"
              />
              <h2 className="font-semibold text-lg mb-2">
                Currently, we’re serving only in Coimbatore
              </h2>
              <p className="text-gray-500 text-sm">
                We’ll get to your district soon 🚀  
                Stay tuned for updates!
              </p>
            </div>

            {/* Action */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationDropdown;
