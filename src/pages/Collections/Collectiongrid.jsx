import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../../api/productApi";
import { QuickModal, useQuickModal } from "../../context/QuickContext";
import SidebarFilters from "./SidebarFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import SortDropdown from "./SortDropdown";
import { P } from "../../components/TextComponents";
import { Eye } from "lucide-react";

const Collectiongrid = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Make sure this matches the route param
  const { openModal } = useQuickModal();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) {
    console.log("Category ID is undefined");
    return;
  }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("Fetching products for category:", id);
      const data = await getProductsByCategory(id);
      console.log("API response:", data);
      const mappedProducts = data.map((item) => ({
        id: item._id,
        title: { en: item.name, ta: item.tamilName || item.name },
        price: `₹${item.weightOptions[0]?.price || 0}.00`,
        oldPrice: `₹${item.weightOptions[0]?.discountPrice || 0}.00`,
        img: item.images[0] || "",
        tag: "",
        fullData: item,
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [id]);


  const handleBuyNow = (productId) => {
  openModal(<QuickModal productId={productId} />);
};

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-16 bg-white">
      <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <SidebarFilters />
      </aside>

      <div className="md:hidden">
        <MobileFilterDrawer productsLength={products.length} />
      </div>

      <main className="w-full md:w-3/4 lg:w-4/5 bg-transparent">
        <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <p className="text-sm text-gray-500">{products.length} products</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">Sort by:</span>
            <SortDropdown />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/products/${item.id}`, { state: { product: item.fullData } })
              }
              className="rounded-lg shadow hover:shadow-md transition overflow-hidden relative group cursor-pointer bg-white"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(item.id);
                  }}
                  className="absolute inset-x-4 bottom-4 bg-red-800 text-white text-sm py-2 cursor-pointer rounded-md opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 z-20"
                >
                  Quick Shop <Eye size={14} />
                </button>

                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              <div className="p-3">
                <P
                  en={item.title.en}
                  ta={item.title.ta}
                  className="text-sm font-medium line-clamp-2"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-red-800 font-semibold">{item.price}</span>
                  <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
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
