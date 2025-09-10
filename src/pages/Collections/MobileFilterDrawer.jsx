import React, { useState } from "react";
import { X } from "lucide-react";
import SidebarFilters from "./SidebarFilters";
import SortDropdown from "./SortDropdown";

const MobileFilterDrawer = ({ productsLength }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-gray-200 sticky top-0 z-30">
        <p className="text-sm text-gray-600">{productsLength} products</p>
        <button
          onClick={() => setOpen(true)}
          className="text-sm font-medium text-gray-800 border px-3 py-1 rounded"
        >
          Filter & Sort
        </button>
      </div>

      {/* Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[80vw] sm:w-96 bg-[#fdf3e3] shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div>
            <h2 className="font-semibold text-gray-800">Filter and sort</h2>
            <p className="text-xs text-gray-500">{productsLength} products</p>
          </div>
          <button onClick={() => setOpen(false)}>
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Body (Filters) */}
        <div className="p-4 h-[calc(100vh-120px)] overflow-visible">
          <SidebarFilters />
          {/* Sort Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Sort by
            </label>
            <SortDropdown />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-white">
          <button className="text-sm text-red-600 underline">Remove all</button>
          <button className="bg-red-800 text-white px-5 py-2 rounded text-sm font-medium">
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
