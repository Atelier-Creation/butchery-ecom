// src/components/FeatureSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay  } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { H3 } from "../../components/TextComponents";

const FeatureSlider = ({features}) => {
  return (
    <div className="w-full px-4 py-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        // navigation
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="pb-12"
      >
        {features?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center text-center rounded-xl py-3 transition">
              <img
                src={item.img}
                alt={item.title.en}
                className="w-28 h-28 object-contain mb-4"
              />
              <H3 className="text-lg font-semibold text-gray-800"en={item.title.en} ta={item.title.ta}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureSlider;
