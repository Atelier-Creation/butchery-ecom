// src/components/FeatureSlider.jsx
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { H3 } from "../../components/TextComponents";

const FeatureSlider = ({ features }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div className="w-full px-4 py2 md:py-8" data-aos="zoom-in" data-aos-delay="100">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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
            <div
              className="flex flex-col items-center text-center rounded-xl py-3 transition"
              data-aos="fade-up"
              data-aos-delay={100 + idx * 100} // stagger animation
            >
              <img
                src={item.img}
                alt={item.title.en}
                className="w-28 h-28 object-contain mb-1 md:mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800" >{item.title.en}</h3>
              <p className="text-xs text-gray-500 max-w-50 mt-1 text-center">({item.title.ta})</p>
              {/* <H3
                className="text-lg font-semibold text-gray-800"
                en={item.title.en}
                ta=
              /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureSlider;
