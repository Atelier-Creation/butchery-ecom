import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarFilters = ({
  type = "category", // "category" | "cut"
  options = [],
  onFilterChange,
}) => {
  const [openSections, setOpenSections] = useState({
    productType: true,
    price: false,
  });

  const [selectedValues, setSelectedValues] = useState([]);
  const [priceRange, setPriceRange] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleCheckboxChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  // 🔁 Trigger parent callback whenever filters change
  useEffect(() => {
    onFilterChange?.({
      type,
      values: selectedValues,
      price: priceRange,
    });
  }, [selectedValues, priceRange]);

  const handleClear = () => {
    setSelectedValues([]);
    setPriceRange({ minPrice: "", maxPrice: "" });
    onFilterChange?.({ type, values: [], price: { minPrice: "", maxPrice: "" } });
  };

  return (
    <aside className="w-full rounded-md p-4 md:p-0">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h3 className="font-semibold text-gray-800 text-base md:text-lg">
          Filters
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>

      {/* Dynamic Filter */}
      <div className="mb-5 border-b border-gray-200 pb-3">
        <button
          className="flex justify-between items-center w-full cursor-pointer text-left font-medium text-gray-800 text-sm md:text-base"
          onClick={() => toggleSection("productType")}
        >
          {type === "category" ? "Category" : "Cut Type"}
          {openSections.productType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.productType ? "max-h-60 mt-3" : "max-h-0"
          }`}
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 mb-2 text-gray-700 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(opt.value)}
                onChange={() => handleCheckboxChange(opt.value)}
                className="w-4 h-4 accent-red-800"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <button
          className="flex justify-between items-center w-full text-left font-medium cursor-pointer text-gray-800 text-sm md:text-base"
          onClick={() => toggleSection("price")}
        >
          Price
          {openSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            openSections.price ? "max-h-40 mt-3" : "max-h-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md px-2 py-1 flex-1">
              ₹
              <input
                type="number"
                name="minPrice"
                placeholder="From"
                className="ml-1 w-full h-8 border-none outline-none bg-transparent text-sm"
                value={priceRange.minPrice}
                onChange={handlePriceChange}
              />
            </div>
            <div className="flex items-center border rounded-md px-2 py-1 flex-1">
              ₹
              <input
                type="number"
                name="maxPrice"
                placeholder="To"
                className="ml-1 w-full h-8 border-none outline-none bg-transparent text-sm"
                value={priceRange.maxPrice}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
