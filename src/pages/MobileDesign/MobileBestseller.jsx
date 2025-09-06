import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

const MobileBestseller = () => {
  const products = [
    {
      id: 1,
      title: "Country Chicken (Naattu Kozhi) Curry Cut Meat",
      img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493",
      price: "₹385.00",
      oldPrice: "₹420.00",
      tag: "Sale",
    },
    {
      id: 2,
      title: "Country Chicken (Naattu Kozhi) Boneless",
      img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
      price: "₹250.00",
      oldPrice: "₹300.00",
      tag: "Sale",
    },
    {
      id: 3,
      title: "Country Chicken (Naattu Kozhi) Lollipop Pack of 6",
      img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
      price: "₹520.00",
      oldPrice: "₹600.00",
      tag: "",
    },
    {
      id: 4,
      title: "Country Chicken (Naattu Kozhi) Chicken Mince/Keema",
      img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766",
      price: "₹250.00",
      oldPrice: "₹280.00",
      tag: "Sale",
    },
  ];

  return (
    <div className="block md:hidden bg-yellow-50 px-4 py-6">
      <h2 className="text-lg font-bold mb-4">Best Sellers</h2>

      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className=" rounded-xl shadow-md overflow-hidden relative"
          >
            {/* Sale Tag */}
            {item.tag && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md">
                {item.tag}
              </span>
            )}

            {/* Product Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-32 object-cover"
            />

            {/* Content */}
            <div className="p-2">
              <p className="text-md font-medium line-clamp-2">{item.title}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-red-600 font-semibold text-md">
                  {item.price}
                </span>
                <span className="text-gray-500 line-through text-md">
                  {item.oldPrice}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-5 mt-2">
                <button className="p-2 w-[10%] rounded-full bg-gray-100 hover:bg-gray-200">
                  <Heart size={16} />
                </button>
                <button className="p-2 w-[85%] rounded-md bg-red-600 text-white hover:bg-red-700">
                  <div className="flex justify-center items-center gap-2 m-0">
                    <ShoppingCart size={16} /> Add to Cart
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <button className="bg-red-600 text-white px-6 py-2 rounded-md font-medium">
          View all
        </button>
      </div>
    </div>
  );
};

export default MobileBestseller;
