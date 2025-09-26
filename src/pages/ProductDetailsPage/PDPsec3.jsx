import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../api/productApi";

const PDPsec3 = ({
  title = "You may also like",
  categoryId,
  currentProductId, // to exclude current product from list
  onViewAll,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductsByCategory(categoryId);
        // Exclude current product
        const filtered = response.filter((p) => p._id !== currentProductId);
        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, currentProductId]);

  if (loading)
    return <p className="text-center py-10">Loading products...</p>;

  if (!products.length)
    return <p className="text-center py-10">No related products found.</p>;

  return (
    <div className="block px-4 py-6 lg:px-10 lg:mt-10">
      <div className="lg:flex lg:justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-4 lg:mb-8 lg:text-4xl">{title}</h2>
        </div>

        {onViewAll && (
          <div className="hidden lg:block mt-6 text-center">
            <button
              onClick={onViewAll}
              className="bg-[#EE1c25] text-white px-6 py-2 rounded-md font-medium"
            >
              View all
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="rounded-xl shadow-md overflow-hidden relative cursor-pointer"
            onClick={() =>
              navigate(`/products/${item._id}`, { state: { product: item } })
            }
          >
            {/* Sale Tag */}
            <div className="relative">
              {item.status === "Sale" && (
                <span className="absolute top-2 left-2 bg-[#EE1c25] text-white text-xs px-2 py-0.5 rounded-md">
                  Sale
                </span>
              )}

              {/* Product Image */}
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full rounded-xl h-full aspect-square object-cover"
              />

              {/* Quick View / Eye Icon */}
              <span className="absolute bottom-2 right-2 bg-[#EE1c25] text-white text-xs px-2.5 py-2 rounded-md">
                <Eye size={18} />
              </span>
            </div>

            {/* Product Info */}
            <div className="p-2">
              <p className="text-md font-medium line-clamp-2">{item.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#EE1c25] font-semibold text-md">
                  ₹{item.weightOptions?.[0]?.price || 0}.00
                </span>
                {item.weightOptions?.[0]?.discountPrice && (
                  <span className="text-gray-500 line-through text-md">
                    ₹{item.weightOptions?.[0]?.discountPrice || 0}.00
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
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

export default PDPsec3;
