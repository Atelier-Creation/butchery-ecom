import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiPause, FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { H2, P, Button } from "../../components/TextComponents";
import image1 from "../../assets/images/top-view-fresh-fish-slices-with-red-tomatoes-dark-blue-background-ocean-meat-seafood-sea-meal-dish-.jpg";
import image2 from "../../assets/images/top-view-meat-concept-with-copy-space.jpg";
import image3 from "../../assets/images/top-view-raw-meat-slices-with-greens-red-tomatoes-dark-background-dish-meat-butcher-meal-salad-.jpg";
const MobileBanner = () => {
  const images = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1668616814974-496fb1ed7a7e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      head: "Fresh, Tender & Juicy Meat Every Day Hygienically Cut, Packed & Delivered",
      para: "Experience meat the way it should be – clean, healthy, and full of flavor.",
    },

    {
      image: image2,
      head: "பசுமையான இறைச்சி, நாட்டு சுவை, உங்கள் குடும்பத்திற்காக.",
      para: "நாட்டு க ோழி, மட்டன், வாத்து – அனை த்தும் சுத்தமாக, நம்பிக்கையுடன",
    },

    {
      image: image3,
      head: "Authentic Cuts, Premium Quality Always From Farm Fresh to Your Family’s Table!",
      para: "Bringing back the taste of tradition with meat you can truly trust.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682991136736-a2b44623eeba?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      head: "சுத்தமாக வெட்டிய இறைச்சி,1 மணி நேரத்தில் உங்கள் வீட்டு வாசலில்.",
      para: "சுவை,பசுமை, விரைவு – அனைத்தும் ஒரே இடத்தில், இறைச்சி கடையில்.",
    },
  ];

  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // added `relative` so mobile fixed buttons can position correctly
    <div className="relative w-full h-90 max-w-md mx-auto overflow-hidden lg:w-full lg:h-[80vh] lg:max-w-none">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 6000 }}
        navigation={false}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src.image}
              alt={`Slide ${idx}`}
              className="relative w-full h-80 lg:h-[80vh] object-cover sm:h-90 md:h-96"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute w-full top-10 left-0 text-center lg:top-25 lg:left-5 flex flex-col lg:gap-3 gap-2 items-center lg:items-start justify-center lg:text-start text-white px-4 lg:w-[60%]">
              <h2 className="lg:text-5xl leading-tight text-2xl font-bold drop-shadow-lg">
                {src.head}
              </h2>
              <p className="lg:mt-2 text-sm md:text-base drop-shadow-md lg:w-3/4">
                {src.para}
              </p>

              {/* keep the overlay buttons only on lg and up */}
              <div className="hidden lg:flex flex-row gap-2 lg:mt-3">
                {/* Get Started button */}
                <Button
                  ta={"Order Now"}
                  en={"Order Now"}
                  className="lg:py-2 lg:px-5 py-2 px-5 border rounded border-[#EE1c25] bg-[#EE1c25] text-white transition duration-300 hover:bg-transparent hover:text-[#EE1c25]"
                />

                {/* View Products button */}
                <Button
                  ta={"View all"}
                  en={"View all"}
                  className="lg:py-2 lg:px-5 py-2 px-5 border bg-transparent rounded border-white text-white transition duration-300 hover:bg-[#EE1c25] hover:text-white hover:border-[#EE1c25]"
                />
              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* mobile fixed buttons at bottom of the banner (visible only on mobile) */}
      <div className="absolute left-0 right-0 bottom-[60px] z-[100] flex justify-center gap-2 px-4 lg:hidden">
        <Button
          ta={"Order Now"}
          en={"Order Now"}
          className="py-2 px-5 border rounded border-[#EE1c25] bg-[#EE1c25] text-white transition duration-300 hover:bg-transparent hover:text-[#EE1c25]"
        />
        <Button
          ta={"View all"}
          en={"View all"}
          className="py-2 px-5 border bg-transparent rounded border-white text-white transition duration-300 hover:bg-[#EE1c25] hover:text-white hover:border-[#EE1c25]"
        />
      </div>

      {/* mobile controls shown under the banner (visible only on mobile). icons black on mobile, white on lg+ */}
      {/* <div className="flex items-center gap-4 justify-center mt-4 lg:hidden">
        <FiChevronLeft
          size={20}
          className="cursor-pointer text-black lg:text-white"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <div className="flex gap-2">
          {images.map((_, dotIdx) => (
            <span
              key={dotIdx}
              onClick={() => swiperRef.current?.slideToLoop(dotIdx)}
              className={`w-3 h-3 rounded-full cursor-pointer ${activeIndex === dotIdx
                ? "bg-black lg:bg-white"
                : "bg-transparent border border-black lg:border-white"
                }`}
            ></span>
          ))}
        </div>
        <FiChevronRight
          size={20}
          className="cursor-pointer text-black lg:text-white"
          onClick={() => swiperRef.current?.slideNext()}
        />
        {isPlaying ? (
          <FiPause
            size={20}
            className="cursor-pointer text-black lg:text-white"
            onClick={toggleAutoplay}
          />
        ) : (
          <FiPlay
            size={20}
            className="cursor-pointer text-black lg:text-white"
            onClick={toggleAutoplay}
          />
        )}
      </div> */}

    </div>
  );
};

export default MobileBanner;
