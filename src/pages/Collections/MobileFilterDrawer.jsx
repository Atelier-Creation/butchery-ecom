import React, { useState } from "react";
import { Filter, X } from "lucide-react";

const MobileFilterDrawer = ({
  type = "category", // "category" | "cut"
  options = [],
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const toggleDrawer = () => setIsOpen(!isOpen);

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

  const handleApply = () => {
    onFilterChange?.({
      type,
      values: selectedValues,
      price: priceRange,
    });
    toggleDrawer();
  };

  const handleClear = () => {
    setSelectedValues([]);
    setPriceRange({ minPrice: "", maxPrice: "" });
    onFilterChange?.({ type, values: [], price: { minPrice: "", maxPrice: "" } });
  };

  return (
    <div className="md:hidden">
      {/* Filter Button */}
      <button
        onClick={toggleDrawer}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-700"
      >
        <Filter size={16} /> Filters
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={toggleDrawer}>
            <X size={20} />
          </button>
        </div>

        {/* Filter Options */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Type Filter */}
          <div>
            <h4 className="text-sm font-semibold mb-2 capitalize">
              {type === "category" ? "Categories" : "Cut Type"}
            </h4>
            <div className="space-y-2">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt.value)}
                    onChange={() => handleCheckboxChange(opt.value)}
                    className="accent-red-800"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Price Range</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={priceRange.minPrice}
                onChange={handlePriceChange}
                className="w-1/2 border rounded-md p-1 text-sm"
              />
              <span>-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={priceRange.maxPrice}
                onChange={handlePriceChange}
                className="w-1/2 border rounded-md p-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={handleClear}
            className="text-gray-500 text-sm font-medium"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="bg-red-800 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
