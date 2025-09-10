import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Best selling");
  const dropdownRef = useRef(null);

  const options = [
    "Best selling",
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-sm" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-red-800 rounded px-3 py-2 text-gray-700"
      >
        <span>{selected}</span>
        <ChevronDown
          size={16}
          className={`ml-2 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute mt-1 w-full bg-[#fdd9cc] border rounded shadow-md z-50">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selected === option ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
