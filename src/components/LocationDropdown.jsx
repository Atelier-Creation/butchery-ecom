import React, { useState, useRef, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { ChevronDown } from "lucide-react";

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

const LocationDropdown = () => {
  const [selected, setSelected] = useState("Coimbatore");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-gray-800 hover:text-red-600 font-medium"
      >
        <IoLocationSharp size={20} color="#E41D25" />
        {selected}
        <ChevronDown
  size={16}
  className={`${open ? "rotate-180" : ""} transition-transform`}
/>

      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute -left-17 mt-2 w-48 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <ul className="py-1 text-sm text-gray-700">
            {districts.map((district) => (
              <li key={district}>
                <button
                  onClick={() => {
                    setSelected(district);
                    setOpen(false);
                  }}
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
  );
};

export default LocationDropdown;