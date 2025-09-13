import React from "react";
import { Eye } from "lucide-react";
import SidebarFilters from "./SidebarFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import SortDropdown from "./SortDropdown";
import { useNavigate } from "react-router-dom";
import { QuickModal, useQuickModal } from "../../context/QuickContext";
import { P } from "../../components/TextComponents";
const Collectiongrid = () => {
  const navigate = useNavigate()
  const {openModal} = useQuickModal()
  const products = [
    {
      id: 1,
      title: {en:"Country Chicken (Naattu Kozhi) Curry Cut",ta : "நாட்டு கோழி கறி துண்டுகள்"},
      price: "₹385.00",
      oldPrice: "₹420.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493",
      tag: "Sale",
    },
    {
      id: 2,
      title: {en:"Broiler Chicken Curry Cut",ta:"ப்ராய்லர் கோழி கறி துண்டுகள்"},
      price: "₹250.00",
      oldPrice: "₹300.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766",
      tag: "Sale",
    },
    {
      id: 3,
      title: {en :"Country Chicken (Naattu Kozhi) Boneless",ta : "நாட்டு கோழி எலும்பில்லா"},
      price: "₹520.00",
      oldPrice: "₹600.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
      tag: "",
    },
    {
      id: 4,
      title: {en :"Country Chicken Mince/Keema" ,ta : "நாட்டு கோழி கீமா"},
      price: "₹250.00",
      oldPrice: "₹280.00",
      img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
      tag: "Sale",
    },
  ];


  const handleBuyNow = () => {
    openModal(
      <QuickModal/>
    );
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 py-16 bg-white">
      {/* Sidebar Filters */}
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <SidebarFilters />
      </aside>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <MobileFilterDrawer productsLength={products.length} />
      </div>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5 bg-transparent">
        {/* Sort bar */}
        <div className=" hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <p className="text-sm text-gray-500">{products.length} products</p>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">Sort by:</span>
            
            <SortDropdown />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/products', { state: { product: item } })}
              className="rounded-lg shadow hover:shadow-md transition overflow-hidden relative group cursor-pointer bg-white"
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
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                {/* Hover Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Quick Shop Button */}
                <button   onClick={(e) => {
    e.stopPropagation(); // ✅ Prevent parent onClick (navigation)
    handleBuyNow();
  }} className="absolute inset-x-4 bottom-4 bg-red-800 text-white text-sm py-2 cursor-pointer rounded-md opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 z-20">
                  Quick Shop <Eye size={14} />
                </button>
              </div>

              {/* Content */}
              <div className="p-3">
                <P en={item.title.en} ta={item.title.ta} className="text-sm font-medium line-clamp-2"/>
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
