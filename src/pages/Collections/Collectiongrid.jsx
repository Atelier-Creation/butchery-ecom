import React, { useState } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import SidebarFilters from "./SidebarFilters";

const Collectiongrid = () => {
  //   const [filters, setFilters] = useState({
  //     chicken: false,
  //     countryChicken: false,
  //   });

  const products = [
    {
      id: 1,
      title: "Country Chicken (Naattu Kozhi) Curry Cut",
      price: "₹385.00",
      oldPrice: "₹420.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493",
      tag: "Sale",
    },
    {
      id: 2,
      title: "Broiler Chicken Curry Cut",
      price: "₹250.00",
      oldPrice: "₹300.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766",
      tag: "Sale",
    },
    {
      id: 3,
      title: "Country Chicken (Naattu Kozhi) Boneless",
      price: "₹520.00",
      oldPrice: "₹600.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
      tag: "",
    },
    {
      id: 4,
      title: "Country Chicken Mince/Keema",
      price: "₹250.00",
      oldPrice: "₹280.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
      tag: "Sale",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 px-8 py-18 bg-[#fdd9cc]">
      {/* Sidebar Filters */}
      <SidebarFilters />

      {/* Product Grid */}
      <main className="w-full md:w-3/4 bg-transparent">
        {/* Sort bar */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">{products.length} products</p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">Sort by:</span>
            <select className="bg-transparent border-0 focus:ring-0 text-gray-800 cursor-pointer">
              <option>Best selling</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow hover:shadow-md transition overflow-hidden relative group cursor-pointer bg-transparent"
            >
              {/* Product Image Wrapper */}
              <div className="relative w-full aspect-square overflow-hidden">
                {/* Sale Tag */}
                {item.tag && (
                  <span className="absolute top-2 left-2 bg-red-800 text-white text-xs px-2 py-0.5 rounded z-20">
                    {item.tag}
                  </span>
                )}

                {/* Default Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 rounded"
                />

                {/* Hover Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded"
                />

                {/* Quick Shop Button (on hover) */}
                <button className="absolute inset-x-4 bottom-4 bg-red-800 text-white text-sm py-2 cursor-pointer rounded-md opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 z-20">
                  Quick Shop <Eye size={14} />
                </button>
              </div>

              {/* Content */}
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-red-800 font-semibold">
                    {item.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {item.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Collectiongrid;
