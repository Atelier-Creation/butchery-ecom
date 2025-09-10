import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const MobileCategorySlider = () => {
  const collections = [
    {
      title: "Country Chicken",
      img: "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493",
      link: "/collections/country-chicken",
    },
    {
      title: "Mutton",
      img: "https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020",
      link: "/collections/mutton",
    },
    {
      title: "Fish",
      img: "https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530",
      link: "/collections/fish",
    },
    {
      title: "Broiler Chicken",
      img: "https://lenaturelmeat.com/cdn/shop/files/Broiler1.jpg?v=1686210766",
      link: "/collections/broiler-chicken-meat",
    },
  ];

  return (
    <div className="w-full overflow-hidden my-2 px-2 block">
      <p className="py-4 mb-2 text-2xl text-center font-medium">
        What do you want on your plate?
      </p>
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={2}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="pb-8"
      >
        {collections.map((item, idx) => (
          <SwiperSlide key={idx}>
            <a
              href={item.link}
              className="block overflow-hidden text-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto rounded-xl object-cover"
              />
              <p className="py-2 text-md font-medium">{item.title}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileCategorySlider;
