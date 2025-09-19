import React, { useState } from "react";

const meatCuts = [
  "Curry Cut",
  "Biriyani Cut",
  "Gravy Cut",
  "Chilli Cut",
  "Sinthamani Cut",
  "Pallipalayam Cut",
  "Keema Cut",
];

const MeatCutDropdown = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col gap-2 w-50">
      <label className="font-medium text-gray-700">Type of Cut</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="
          border border-gray-300 rounded-md px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400
          bg-white text-gray-800
        "
      >
        <option value="">Please select</option>
        {meatCuts.map((cut) => (
          <option key={cut} value={cut}>
            {cut}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MeatCutDropdown;
