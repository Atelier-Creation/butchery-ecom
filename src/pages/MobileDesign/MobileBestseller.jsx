import React from "react";
import { Eye } from "lucide-react";

const MobileBestseller = ({ 
  title = "Best Sellers", 
  subtitle = "Most popular product near you!", 
  products = [], 
  onViewAll 
}) => {
  return (
    <div className="block px-4 py-6 lg:px-10 lg:mt-10">
      <div className="lg:flex lg:justify-between">
      <div>
      {subtitle && <p className="text-xs text-gray-600 mb-1 lg:text-base">{subtitle}</p>}
      <h2 className="text-xl font-bold mb-4 lg:mb-8 lg:text-4xl lg:font-bold">{title}</h2>
      </div>
            {/* View All Button */}
            {onViewAll && (
        <div className="hidden lg:block mt-6 text-center">
          <button
            onClick={onViewAll}
            className="bg-red-800 text-white px-6 py-2 rounded-md font-medium"
          >
            View all
          </button>
        </div>
      )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-md overflow-hidden relative"
          >
            {/* Sale Tag */}
            <div className="relative">
              {item.tag && (
                <span className="absolute top-2 left-2 bg-red-800 text-white text-xs px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
              )}

              {/* Product Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full rounded-xl h-full aspect-square object-cover"
              />

              <span className="absolute bottom-2 right-2 bg-red-800 text-white text-xs px-2.5 py-2 rounded-md">
                <Eye size={18} />
              </span>
            </div>

            {/* Content */}
            <div className="p-2">
              <p className="text-md font-medium line-clamp-2">{item.title}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-red-600 font-semibold text-md">
                  {item.price}
                </span>
                {item.oldPrice && (
                  <span className="text-gray-500 line-through text-md">
                    {item.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {onViewAll && (
        <div className="mt-6 text-center lg:hidden">
          <button
            onClick={onViewAll}
            className="bg-red-800 text-white px-6 py-2 rounded-md font-medium"
          >
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileBestseller;
