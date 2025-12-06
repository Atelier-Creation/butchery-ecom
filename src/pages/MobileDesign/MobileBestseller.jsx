import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "../../components/TextComponents";
import { useNavigate } from "react-router-dom";
import { QuickModal, useQuickModal } from "../../context/QuickContext";
import Aos from "aos";
import { getProducts } from "../../api/productApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { color } from "framer-motion";

const MobileBestseller = ({
  title = "Best Sellers",
  subtitle = "Most popular product near you!",
}) => {
  const { openModal } = useQuickModal();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleBuyNow = (productId) => {
    openModal(<QuickModal productId={productId} />);
  };

  const handleViewAll = () => {
    navigate("/collections/all");
  };

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: true });

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // navigate to product details
  const goToProduct = (item) => {
    navigate(`/products/${item._id}`, { state: { product: item } });
  };

  return (
    <div className="block px-5 py-2 lg:px-30 lg:mt-2">
      {/* Header */}
      <div className="lg:flex lg:justify-between">
        <div>
          {subtitle && (
            <p className="text-lg text-red-600 font-semibold mb-1">
              {subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-3xl font-extrabold leading-tight mb-4 text-gray-700">
            {title}
          </h2>
        </div>
        <div className="hidden lg:block mt-6 text-center">
          <button
            onClick={handleViewAll}
            className="relative cursor-pointer overflow-hidden bg-black text-white px-6 py-2 rounded-md font-medium group transition-all duration-700 hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="relative z-10">View all</span>
            <span
              className="absolute top-0 left-[-75%] w-[50%] h-full 
              bg-gradient-to-r from-transparent via-white/40 to-transparent 
              transform skew-x-[-20deg] 
              transition-all duration-700 ease-in-out 
              group-hover:left-[125%]"
            />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={12}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2 },
          420: { slidesPerView: 2.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-20 bestseller"
      >
        {products.map((item, idx) => (
          <SwiperSlide key={item._id}>
            <div
              className="group rounded-xl cursor-pointer shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => goToProduct(item)}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
            >
              {/* Sale Tag */}
              <div className="relative">
                {item.tag && (
                  <span className="absolute top-2 left-2 bg-[#EE1c25] text-white text-xs px-2 py-0.5 rounded-md z-10">
                    {item.tag}
                  </span>
                )}

                {/* Image */}
                <div className="overflow-hidden rounded-xl h-40 sm:h-48">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Eye Icon (hidden on mobile, shows on hover in md+) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(item._id);
                  }}
                  className="hidden md:flex absolute bottom-2 right-2 items-center justify-center cursor-pointer bg-[#EE1c25] text-white text-xs px-2.5 py-2 rounded-md
                    opacity-0 translate-y-2 transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-y-0"
                  aria-label={`Quick view ${item.name}`}
                >
                  <Eye size={18} />
                </button>
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-sm md:text-[13px] lg:text-base h-[40px] md:h-[56px] lg:h-[72px] font-medium line-clamp-3 group-hover:text-[#EE1c25] transition-colors">
                  {item.name}
                </p>

                {/* Price + Add button */}
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {item.weightOptions?.[0]?.discountPrice && (
                      <span className="text-gray-500 line-through text-[10px]">
                        ₹
                        {Number(item.weightOptions[0].discountPrice).toFixed(2)}
                      </span>
                    )}
                    <span className="text-[#EE1c25] font-bold text-md">
                      ₹
                      {item.weightOptions?.[0]?.price
                        ? Number(item.weightOptions[0].price).toFixed(2)
                        : "-"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToProduct(item);
                    }}
                    className="px-2 py-1 rounded-md bg-[#EE1c25] text-white text-[14px] font-medium hover:bg-red-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile View All */}
      <div className="mt-6 text-center lg:hidden">
        <Button
          onClick={handleViewAll}
          en="View all"
          ta="View all"
          className="bg-black text-white px-20 py-2 w-full rounded-md font-medium"
        />
      </div>
    </div>
  );
};

export default MobileBestseller;
