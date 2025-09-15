import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { P } from "../../components/TextComponents";

const MobileCategorySlider = () => {
  const collections = [
    {
      title: { en: "Country Chicken", ta: "நாட்டு கோழி" },
      img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493",
      link: "/collections/country-chicken",
    },
    {
      title: { en: "Mutton", ta: "மட்டன்" },
      img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
      link: "/collections/mutton",
    },
    {
      title: { en: "Chicken", ta: "கோழி" },
      img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766",
      link: "/collections/broiler-chicken-meat",
    },
    {
      title: { en: "Duck", ta: "வாத்து" },
      img: "https://lenaturelmeat.com/cdn/shop/files/DUCKIMAGE.jpg?v=1686986814&width=1920",
      link: "/collections/duck-meat",
    },
  ];

  return (
    <div className="w-full overflow-hidden my-2 px-5 block lg:px-15 lg:mt-10">
      <p className="py-4 mb-2 lg:mb-8 text-xl text-center font-bold lg:text-3xl lg:font-bold">
        Enjoy Fresh Meat With The Best Quality
      </p>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={2}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        className="pb-8"
      >
        {collections.map((item, idx) => (
          <SwiperSlide key={idx}>
            <a
              href={item.link}
              className="group block overflow-hidden text-center rounded-xl "
            >
              {/* Image wrapper with shine effect */}
              <div className="relative w-[240px] h-[240px] mx-auto aspect-[1/1] overflow-hidden rounded-xl transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Shine effect */}
                <span
                  className="absolute inset-0 block
                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                 translate-x-[-100%] 
                 group-hover:translate-x-[100%] 
                 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Title */}
              <P
                en={item.title.en}
                ta={item.title.ta}
                className="py-2 text-md font-medium transition-colors duration-300 group-hover:text-[#EE1c25]"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileCategorySlider;
