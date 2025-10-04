import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/categorieApi";

const MobileCategorySlider = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const colors = ["#7d8d2a", "#e7a545", "#8b2a2a", "#d98b4e"];
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const mappedData = data.map((item, index) => {
          const nameParts = item.name.split(" ");
          const subtitles = nameParts[0];
          const titleEn =
            nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];

          return {
            id: item._id, // save category ID
            title: { en: titleEn, ta: item.tamilName },
            subtitles: subtitles,
            img: item.image,
            desc: { en: item.description, ta: item.tamilDescription },
            bg: colors[index % colors.length],
          };
        });
        setCollections(mappedData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="w-full px-5 lg:px-12 mb-6 lg:mt-6">
      <p className="text-[#4a5565] pt-6">
        Categories
      </p>
      <p className="py-1 mb-6 text-xl font-bold lg:text-3xl">
        Enjoy Fresh Meat With The Best Quality
      </p>

      {/* Mobile View */}
      <div className="block md:hidden category">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="py-20 overflow-visible"
        >
          {collections.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                onClick={() => navigate(`/collections/${item.id}`)} // use ID here
                style={{ backgroundColor: item.bg }}
                className="relative group z-50 cursor-pointer shadow-2xl rounded-xl h-[360px] sm:h-[300px] md:h-[340px] overflow-visible transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 200}
              >
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-[66%] left-[34%] absolute -top-[9%] h-fit object-contain z-100 shadow-2xl rounded-[50%] transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="p-4 absolute bottom-0 text-left flex flex-col gap-1 h-auto">
                  <div>
                    <span className="text-2xl inline-block text-gray-200" style={{ marginBottom: "-3px" }}>
                      {item.subtitles}
                    </span>
                    <h3 className="text-3xl font-semibold mb-2 text-gray-50">
                      {item.title.en} <span className="text-xl block">{item.title.ta}</span>
                    </h3>
                  </div>
                  <p className="text-gray-100 text-sm opacity-90 mb-3">
                    {item.desc.en + " "}
                    <span className="text-gray-100 text-xs opacity-90">({item.desc.ta})</span>
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/collections/${item.id}`); }}
                    className="mt-auto text-center w-1/2 inline-block bg-black text-white px-4 py-2 rounded-full text-sm 
                      transition-all duration-300 ease-in-out 
                      hover:bg-[#4e210b] hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-[5%]">
        {collections.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/collections/${item.id}`)} // use ID
            style={{ backgroundColor: item.bg }}
            className="relative group cursor-pointer shadow-2xl rounded-xl h-[300px] overflow-visible transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay={idx * 200}
          >
            <img
              src={item.img}
              alt={item.title.en}
              className="w-[60%] left-[42%] absolute -top-[15%] h-fit object-cover shadow-2xl rounded-[50%] transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="p-4 absolute bottom-0 text-left flex flex-col gap-1 h-auto">
              <div>
                <span className="text-lg font-medium inline-block text-gray-100" style={{ marginBottom: "-3px" }}>
                  {item.subtitles}
                </span>
                <h3 className="text-4xl font-semibold mb-1 text-gray-50">
                  {item.title.en} <span className="block text-xs">( {item.title.ta} )</span>
                </h3>
              </div>
              <p className="text-gray-100 text-sm opacity-90 mb-3">
                {item.desc.en + " "}
                <span className="text-gray-100 text-xs opacity-90">({item.desc.ta})</span>
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/collections/${item.id}`); }}
                className="relative overflow-hidden group/button mt-auto text-center w-1/2 inline-block shadow-lg
                  bg-black text-white px-4 py-2 rounded-full text-sm 
                  transition-all duration-300 ease-in-out 
                  hover:bg-black hover:scale-105 
                  hover:shadow-xl active:scale-95"
              >
                ORDER NOW
                <span
                  className="absolute top-0 left-[-75%] w-[50%] h-full 
                    bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    transform skew-x-[-20deg] 
                    group-hover/button:left-[125%] 
                    transition-all duration-700 ease-in-out"
                ></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategorySlider;
