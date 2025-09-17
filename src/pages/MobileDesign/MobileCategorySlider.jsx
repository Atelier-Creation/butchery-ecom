import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Aos from "aos";
import "aos/dist/aos.css";

const MobileCategorySlider = () => {
  const collections = [
    {
      title: { en: "Chicken", ta: "நாட்டு கோழி" },
      subtitles: "Country",
      img: "/Meat/cat-1.png",
      desc: "Tender and juicy country chicken, raised naturally for rich flavor. Freshly sourced daily to ensure the best quality. Perfect for authentic home-style cooking.",
      link: "/collections/country-chicken",
      bg: "#7d8d2a",
    },
    {
      title: { en: "Mutton", ta: "மட்டன்" },
      subtitles: "Fresh",
      img: "/Meat/cat-2.png",
      desc: "Premium goat meat with unbeatable tenderness and taste. Handpicked and hygienically processed for your family. Ideal for curries, biryanis.",
      link: "/collections/mutton",
      bg: "#e7a545",
    },
    {
      title: { en: "Chicken", ta: "கோழி" },
      subtitles: "Broiler",
      img: "/Meat/cat-3.png",
      desc: "Fresh broiler chicken, packed with protein and nutrition. Perfectly cut to make your cooking easy and enjoyable. A healthy choice for everyday meals.",
      link: "/collections/broiler-chicken-meat",
      bg: "#8b2a2a",
    },
    {
      title: { en: "Duck", ta: "வாத்து" },
      subtitles: "Fresh",
      img: "/Meat/cat-4.png",
      desc: "Delicious farm-fresh duck meat with rich texture and taste. Carefully sourced to bring authentic flavors to your kitchen. Great for traditional and gourmet recipes.",
      link: "/collections/duck-meat",
      bg: "#d98b4e",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="w-full px-5 lg:px-12 mb-6">
      <p className="py-4 mb-6 text-xl text-center font-bold lg:text-3xl">
        Enjoy Fresh Meals With The Best Quality
      </p>

      {/* Mobile View (Swiper) */}
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
                style={{ backgroundColor: item.bg }}
                className="relative group z-50 cursor-pointer shadow-2xl rounded-xl h-[340px] sm:h-[300px] md:h-[340px] overflow-visible transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 200}
              >
                <img
                  src={item.img}
                  alt={item.title.en}
                  className="w-[60%] left-[35%] absolute -top-[10%] h-fit object-contain z-100 shadow-2xl rounded-[50%] transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="p-4 absolute bottom-0 text-left flex flex-col gap-1 h-auto">
                  <div>
                    <span
                      className="text-2xl inline-block text-gray-200 cute-font"
                      style={{ marginBottom: "-3px" }}
                    >
                      {item.subtitles}
                    </span>
                    <h3 className="text-3xl font-semibold mb-2 text-gray-50">
                      {item.title.en}
                    </h3>
                  </div>
                  <p className="text-gray-100 text-sm opacity-90 mb-3">
                    {item.desc}
                  </p>
                  <a
                    href={item.link}
                    className="mt-auto text-center w-1/2 inline-block bg-[#492818] text-white/90 px-2 py-2 rounded-full text-sm transition-colors duration-500 ease-in-out hover:bg-[#4e210b]"
                  >
                    ORDER NOW
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop View (Grid) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-[5%]">
        {collections.map((item, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: item.bg }}
            className="relative group cursor-pointer shadow-2xl rounded-xl h-[300px] overflow-visible transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay={idx * 200}
          >
            <img
              src={item.img}
              alt={item.title.en}
              className="w-[60%] left-[42%] absolute -top-[15%] h-fit object-contain shadow-2xl rounded-[50%] transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="p-4 absolute bottom-0 text-left flex flex-col gap-1 h-auto">
              <div>
                <span
                  className="text-2xl inline-block text-gray-200 cute-font"
                  style={{ marginBottom: "-3px" }}
                >
                  {item.subtitles}
                </span>
                <h3 className="text-4xl font-semibold mb-2 text-gray-50">
                  {item.title.en}
                </h3>
              </div>
              <p className="text-gray-100 text-sm opacity-90 mb-3">
                {item.desc}
              </p>
              <a
                href={item.link}
                className="mt-auto text-center w-1/2 inline-block bg-[#492818] text-white/90 px-2 py-2 rounded-full text-sm transition-colors duration-500 ease-in-out hover:bg-[#4e210b]"
              >
                ORDER NOW
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCategorySlider;
