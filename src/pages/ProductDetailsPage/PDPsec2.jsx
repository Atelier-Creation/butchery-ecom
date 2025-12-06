import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const data = [
  {
    head: "What makes Iraichi Kadai Mutton Keema flavorful and tender",
    para: `Iraichi Kadai Mutton Keema is freshly minced to deliver rich, authentic flavor and a soft, tender texture for every dish.`,
  },
  {
    head: "Is Iraichi Kadai Mutton Keema free from antibiotics and hormones?",
    para: `Our keema comes from goats raised without antibiotics or hormones, ensuring a clean and natural product you can trust.`,
  },
  {
    head: "What nutritional benefits does Iraichi Kadai Mutton Keema offer?",
    para: `A powerhouse of protein, iron, and essential vitamins, it supports a healthy and balanced diet.`,
  },
  {
    head: "What types of dishes can I prepare using Iraichi Kadai Mutton Keema?",
    para: `Ideal for keema pav, mutton cutlets, curries, stuffed parathas, or savory pastry fillings.`,
  },
  {
    head: "Can Iraichi Kadai Mutton Keema be used for both daily meals and festive cooking?",
    para: `Whether for everyday meals or special occasions, its fresh taste adds depth to every recipe.`,
  },
  {
    head: "How does Iraichi Kadai ensure ethical and sustainable sourcing for its mutton keema?",
    para: `Our goats are nurtured with care in a sustainable manner, ensuring quality meat with no compromise on ethics.`,
  },
];

function PDPsec2({ images = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-between items-start lg:px-20 lg:py-5 md:px-10 py-5 px-3 lg:gap-10 gap-5">
      {/* Left Q&A Section */}
      <div className="w-full space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 cursor-pointer"
            onClick={() => toggleItem(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{item.head}</h4>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 text-base">{item.para}</p>
            )}
          </div>
        ))}
      </div>

      {/* Right Image Slider Section */}
      <div className="w-full lg:h-[80vh] h-[50vh] rounded-xl overflow-hidden">
        {images.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="h-full w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Product slide ${index + 1}`}
                  className="h-full w-full object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src="https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360"
            alt="Placeholder"
            className="h-full w-full object-cover rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

export default PDPsec2;
