import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobileBanner = () => {
  const images = [
    "/Country-chicken-Legs.png", 
    "/country-chicken-plater.jpg",
    "/indian-chicken-gravy.webp",
  ];

  return (
    <div className="w-full h-90 max-w-md mx-auto overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={false}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="w-full h-90 object-cover sm:h-80 md:h-96"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileBanner;
