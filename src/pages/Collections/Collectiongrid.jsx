import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory, getProducts } from "../../api/productApi";
import { QuickModal, useQuickModal } from "../../context/QuickContext";
import SidebarFilters from "./SidebarFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import SortDropdown from "./SortDropdown";
import { Eye } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const Collectiongrid = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal } = useQuickModal();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch products based on route param
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;

        // 🧭 CASE 1: All products page (filter by category)
        if (!id || id === "all") {
          const response = await getProducts();
          data = response.data || [];

          // ✅ Extract unique category IDs + names
          const categoryMap = new Map();
          data.forEach((p) => {
            if (p.category?._id && p.category?.name) {
              categoryMap.set(p.category._id, p.category.name);
            }
          });

          const uniqueCategories = Array.from(categoryMap.entries()).map(
            ([value, label]) => ({ label, value })
          );

          setFilterOptions(uniqueCategories);
        } 
        // 🧭 CASE 2: Category page (filter by cut type)
        else {
          const response = await getProductsByCategory(id);
          data = response || [];

          // ✅ Extract unique cut types
          const allCuts = data.flatMap((p) =>
            Array.isArray(p.cutType) ? p.cutType : [p.cutType]
          );
          const uniqueCuts = [...new Set(allCuts.filter(Boolean))];

          setFilterOptions(uniqueCuts.map((name) => ({ label: name, value: name })));
        }

        // ✅ Map products for display
        const mappedProducts = data.map((item) => ({
          id: item._id,
          title: { en: item.name, ta: item.tamilName || item.name },
          price: `₹${item.weightOptions?.[0]?.price || 0}.00`,
          oldPrice: `₹${item.weightOptions?.[0]?.discountPrice || 0}.00`,
          img: item.images?.[0] || "",
          fullData: item,
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  // ✅ Filter handler
  const handleFilterChange = ({ type, values, price }) => {
    let filtered = [...products];

    // ✅ Apply category or cut type filter
    if (values.length > 0) {
      filtered = filtered.filter((p) => {
        if (type === "category") {
          const categoryId = p.fullData.category?._id;
          return values.includes(categoryId);
        } else {
          const cuts = Array.isArray(p.fullData.cutType)
            ? p.fullData.cutType
            : [p.fullData.cutType];
          return cuts.some((c) => values.includes(c));
        }
      });
    }

    // ✅ Apply price filter
    const min = parseFloat(price.minPrice) || 0;
    const max = parseFloat(price.maxPrice) || Infinity;

    filtered = filtered.filter((p) => {
      const actualPrice = p.fullData.weightOptions?.[0]?.price || 0;
      return actualPrice >= min && actualPrice <= max;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // ✅ Pagination logic
  const displayProducts = filteredProducts.length ? filteredProducts : products;
  const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = displayProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSortChange = (option) => {
    let sorted = [...(filteredProducts.length ? filteredProducts : products)];

    switch (option) {
      case "Price: Low to High":
        sorted.sort(
          (a, b) =>
            (a.fullData.weightOptions?.[0]?.price || 0) -
            (b.fullData.weightOptions?.[0]?.price || 0)
        );
        break;

      case "Price: High to Low":
        sorted.sort(
          (a, b) =>
            (b.fullData.weightOptions?.[0]?.price || 0) -
            (a.fullData.weightOptions?.[0]?.price || 0)
        );
        break;

      case "Newest First":
        sorted.sort(
          (a, b) =>
            new Date(b.fullData.createdAt) - new Date(a.fullData.createdAt)
        );
        break;

      default:
        // "Best selling" or default - no sorting or custom logic later
        break;
    }

    setFilteredProducts(sorted);
  };

  // ✅ Quick Shop modal
  const handleBuyNow = (productId) => {
    openModal(<QuickModal productId={productId} />);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-16 bg-white">
      {/* Sidebar */}
      <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <SidebarFilters
          type={!id || id === "all" ? "category" : "cut"}
          options={filterOptions}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Mobile Filter */}
      <div className="md:hidden">
        <MobileFilterDrawer
          productsLength={products.length}
          type={!id || id === "all" ? "category" : "cut"}
          options={filterOptions}
        />
      </div>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <p className="text-sm text-gray-500">{displayProducts.length} products</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">Sort by:</span>
            <SortDropdown onSortChange={handleSortChange} />
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-lg shadow overflow-hidden bg-white animate-pulse"
                >
                  <div className="relative w-full aspect-square bg-gray-200"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : currentProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/products/${item.id}`, {
                      state: { product: item.fullData },
                    })
                  }
                  className="rounded-lg shadow hover:shadow-md transition overflow-hidden relative group cursor-pointer bg-white"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    {/* Hidden on mobile (<= md) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(item.id);
                      }}
                      className="hidden md:inline-flex cursor-pointer absolute inset-x-4 bottom-4 bg-red-800 text-white text-sm py-2 rounded-md opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 z-20"
                      aria-hidden="false"
                    >
                      Quick Shop <Eye size={14} />
                    </button>

                    <img
                      src={item.img}
                      alt={item.title.en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-2">{item.title.en}</p>
                    <p className="text-[11px] text-gray-500 max-w-60 mt-1">
                      {item.title.ta}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-red-800 font-semibold">{item.price}</span>
                      <span className="text-gray-400 line-through text-sm">
                        {item.oldPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination Controls (Optional) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-red-800 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Collectiongrid;
