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
            id: item._id,
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
      <p className="text-lg text-red-600 font-semibold mb-1">
        Categories
      </p>
      <p className="text-3xl md:text-3xl font-extrabold leading-tight mb-4 text-gray-700">
        Enjoy Fresh Meat With The Best Quality
      </p>

      {/* ✅ Mobile View */}
      <div className="block md:hidden category space-y-4">
        {/* FIRST ROW: two wide horizontal cards (each = 50% width) */}
        <div className="flex w-full gap-2">
          {collections.slice(0, 2).map((item, idx) => (
            <div
              key={item.id ?? idx}
              onClick={() => navigate(`/collections/${item.id}`)}
              className="relative flex items-center overflow-hidden bg-white rounded-2xl shadow-md w-1/2 p-3 cursor-pointer  transition-transform duration-300 hover:scale-102 h-30"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* circular image slightly inset */}
              <div className="flex-shrink-0 -ml-1">
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-20 h-20 object-cover rounded-full shadow-md border-4 border-white"
                />
              </div>

              {/* title on the right */}
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-gray-700">
                  {item.title.en}
                </h3>
              </div>

              {/* pink bottom badge (positioned absolute to overlap bottom center) */}
              <div className="absolute bottom-2  left-7/11 transform -translate-x-1/2 translate-y-3/4">
                <div className="bg-pink-100 w-20 h-6 text-[8px] text-center  py-1 rounded-full shadow-sm text-xs text-gray-700">
                  {item.title.ta || ""}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECOND ROW: three small square cards (each = 1/3 width) */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {collections.slice(2, 5).map((item, idx) => (
            <div
              key={item.id ?? idx + 2}
              onClick={() => navigate(`/collections/${item.id}`)}
              className="relative h-27 flex flex-col overflow-hidden items-center bg-white rounded-2xl shadow-md p-2 cursor-pointer transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={(idx + 2) * 100}
            >
              <div className="flex justify-center -mt-2">
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-white"
                />
              </div>
              <div className="text-center mt-2">
                <h3 className="text-[10px] font-medium text-gray-700">
                  {item.title.en}
                </h3>
              </div>

              <div className="absolute bottom-2 left-1/2  transform -translate-x-1/2 translate-y-3/4">
                <div className="bg-pink-100 w-20  h-6 text-[8px] text-center px-2 py-0.5 rounded-full text-[8px] text-gray-700">
                  {item.title.ta || ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>





      {/* 🖥️ Desktop View with Swiper (but same design) */}
      <div className="hidden md:block category">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="py-10 "
          style={{ overflowY: 'visible', paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          {collections.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                onClick={() => navigate(`/collections/${item.id}`)}
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
                    <span className="text-lg font-medium inline-block text-gray-100">
                      {item.subtitles}
                    </span>
                    <h3 className="text-4xl font-semibold mb-1 text-gray-50">
                      {item.title.en.includes(" ") ? (
                        item.title.en.split(" ").map((word, idx) =>
                          idx === 1 ? <><br key={idx} />{word}</> : word
                        )
                      ) : (
                        item.title.en
                      )}
                      <span className="block text-xs">( {item.title.ta} )</span>
                    </h3>

                  </div>
                  <p className="text-gray-100 text-sm opacity-90 mb-3">
                    {item.desc.en + " "}
                    <span className="text-gray-100 text-xs opacity-90">
                      ({item.desc.ta})
                    </span>
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/collections/${item.id}`);
                    }}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MobileCategorySlider;
