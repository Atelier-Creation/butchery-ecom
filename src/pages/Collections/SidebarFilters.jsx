import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarFilters = () => {
  const [openSections, setOpenSections] = useState({
    productType: true,
    price: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [filters, setFilters] = useState({
    chicken: false,
    countryChicken: false,
    minPrice: "",
    maxPrice: "",
  });

  return (
    <aside className="w-full  rounded-md md:bg-transparent md:shadow-none p-4 md:p-0">
      <h3 className="font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800 text-base md:text-lg">
        Filter
      </h3>

      {/* Product Type Filter */}
      <div className="mb-5 border-b border-gray-200 pb-3">
        <button
          className="flex justify-between items-center w-full cursor-pointer text-left font-medium text-gray-800 text-sm md:text-base"
          onClick={() => toggleSection("productType")}
        >
          Product type
          {openSections.productType ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            openSections.productType ? "max-h-40 mt-3" : "max-h-0"
          }`}
        >
          <label className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              checked={filters.chicken}
              onChange={() =>
                setFilters({ ...filters, chicken: !filters.chicken })
              }
              className="w-4 h-4 accent-red-800"
            />
            Chicken <span className="text-gray-500">(6)</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              checked={filters.countryChicken}
              onChange={() =>
                setFilters({
                  ...filters,
                  countryChicken: !filters.countryChicken,
                })
              }
              className="w-4 h-4 accent-red-800"
            />
            Country Chicken <span className="text-gray-500">(3)</span>
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <button
          className="flex justify-between items-center w-full text-left font-medium cursor-pointer text-gray-800 text-sm md:text-base"
          onClick={() => toggleSection("price")}
        >
          Price
          {openSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            openSections.price ? "max-h-40 mt-3" : "max-h-0"
          }`}
        >
          <p className="mb-2 text-xs md:text-sm text-gray-600">
            The highest price is <span className="font-semibold">₹3,950.00</span>
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md px-2 py-1 flex-1">
              ₹
              <input
                type="number"
                placeholder="From"
                className="ml-1 w-full h-8 border-none outline-none bg-transparent text-sm"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
            </div>
            <div className="flex items-center border rounded-md px-2 py-1 flex-1">
              ₹
              <input
                type="number"
                placeholder="To"
                className="ml-1 w-full h-8 border-none outline-none bg-transparent text-sm"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
