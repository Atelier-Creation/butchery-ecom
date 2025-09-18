import React, { useEffect } from "react";
import { Eye } from "lucide-react";
import { Button, P } from "../../components/TextComponents";
import { useNavigate } from "react-router-dom";
import { QuickModal, useQuickModal } from "../../context/QuickContext";
import Aos from "aos";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobileBestseller = ({
  title = "Best Sellers",
  subtitle = "Most popular product near you!",
  products = [],
  onViewAll,
}) => {
  const { openModal } = useQuickModal();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    openModal(<QuickModal />);
  };

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="block px-5 py-6 lg:px-30 lg:mt-10">
      {/* Header */}
      <div className="lg:flex lg:justify-between">
        <div>
          {subtitle && (
            <p className="text-xs text-gray-600 mb-1 lg:text-base">{subtitle}</p>
          )}
          <h2 className="text-xl font-bold mb-4 md:mb-8 lg:mb-8 lg:text-4xl lg:font-bold">
            {title}
          </h2>
        </div>
        {onViewAll && (
          <div className="hidden lg:block mt-6 text-center">
            <Button
              onClick={onViewAll}
              ta={"View all"}
              en={"View all"}
              className="bg-red-800 text-white px-6 py-2 rounded-md font-medium"
            />
          </div>
        )}
      </div>

      {/* ✅ Swiper instead of grid */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        // navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2 }, // mobile
          768: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 5 }, // large screens
        }}
        className="pb-20 bestseller"
      >
        {products.map((item, idx) => (
          <SwiperSlide key={item.id}>
            <div
              className="group rounded-xl shadow-md overflow-hidden relative  
                 transition-all duration-300 ease-out 
                 hover:shadow-xl hover:-translate-y-1"
              onClick={() =>
                navigate(`/products/${item.title}`, { state: { product: item } })
              }
              data-aos="fade-up"
              data-aos-delay={idx * 200}
            >
              {/* Sale Tag */}
              <div className="relative">
                {item.tag && (
                  <span className="absolute top-2 left-2 bg-[#EE1c25] text-white text-xs px-2 py-0.5 rounded-md z-10">
                    {item.tag}
                  </span>
                )}

                {/* Product Image */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.img}
                    alt={item.title.en}
                    className="w-full aspect-square object-cover 
                       transform transition-transform duration-500 
                       group-hover:scale-105"
                  />
                </div>

                {/* Eye Icon */}
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevent navigation
                    handleBuyNow();
                  }}
                  className="absolute bottom-2 right-2 cursor-pointer bg-[#EE1c25] text-white text-xs px-2.5 py-2 rounded-md
                     opacity-0 translate-y-2 transition-all duration-300
                     group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <Eye size={18} />
                </span>
              </div>

              {/* Content */}
              <div className="p-2">
                <P
                  en={item.title.en}
                  ta={item.title.ta}
                  className="text-md font-medium line-clamp-2 transition-colors duration-300 group-hover:text-[#EE1c25]"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[#EE1c25] font-semibold text-md">
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button for Mobile */}
      {onViewAll && (
        <div className="mt-6 text-center lg:hidden">
          <Button
            onClick={onViewAll}
            ta={"View all"}
            en={"View all"}
            className="bg-red-800 text-white px-20 py-2 w-full rounded-md font-medium"
          />
        </div>
      )}
    </div>
  );
};

export default MobileBestseller;
