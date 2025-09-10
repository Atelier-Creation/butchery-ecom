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
    <aside className="w-full md:w-1/4 rounded-md p-4 h-fit">
      <h3 className="font-semibold mb-3 border-b border-gray-300 pb-2">
        Filter:
      </h3>

      {/* Product Type Filter */}
      <div className="mb-4 border-b border-gray-300 pb-3">
        <button
          className="flex justify-between items-center w-full cursor-pointer text-left font-medium text-gray-800"
          onClick={() => toggleSection("productType")}
        >
          Product type
          {openSections.productType ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.productType && (
          <div className="mt-2 pl-1 text-sm text-gray-700">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={filters.chicken}
                onChange={() =>
                  setFilters({ ...filters, chicken: !filters.chicken })
                }
              />
              Chicken <span className="text-gray-500">(6)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.countryChicken}
                onChange={() =>
                  setFilters({
                    ...filters,
                    countryChicken: !filters.countryChicken,
                  })
                }
              />
              Country Chicken <span className="text-gray-500">(3)</span>
            </label>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div>
        <button
          className="flex justify-between items-center w-full text-left font-medium cursor-pointer text-gray-800"
          onClick={() => toggleSection("price")}
        >
          Price
          {openSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 text-sm text-gray-700">
            <p className="mb-2">The highest price is Rs. 3,950.00</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md px-2 py-1">
                ₹
                <input
                  type="number"
                  placeholder="From"
                  className="ml-1 w-[50%] h-8 border-none outline-none bg-transparent"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center border rounded-md px-2 py-1">
                ₹
                <input
                  type="number"
                  placeholder="To"
                  className="ml-1 w-[50%] h-8 border-none outline-none bg-transparent"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarFilters;
