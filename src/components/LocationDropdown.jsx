import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationDropdown = () => {
  return (
    <div className="inline-flex items-center gap-1 text-gray-800 font-medium">
      <IoLocationSharp size={20} color="#E41D25" />
      Coimbatore
    </div>
  );
};

export default LocationDropdown;
