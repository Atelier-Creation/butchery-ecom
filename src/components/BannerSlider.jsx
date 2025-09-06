import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function BannerSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);

  const slides = [
    {
      id: 1,
      image: "./slider-1.jpg",
      subtitle: "Fresh Meat",
      title: "BEST MEATS & MUCH MORE",
      description: "Discover organic, sustainable and seasonal food from our farm",
      button: "Discover Now",
    },
    {
      id: 2,
      image: "./country-chicken-plater.jpg",
      subtitle: "Organic Cuts",
      title: "PREMIUM QUALITY MEAT",
      description: "From farm to table – freshness guaranteed",
      button: "Shop Now",
    },
  ];

  useEffect(() => {
    // Reset animation stage when slide changes
    setAnimationStage(0);

    // Use timeouts to trigger animations for each element sequentially
    const timeouts = [
      setTimeout(() => setAnimationStage(1), 100),
      setTimeout(() => setAnimationStage(2), 300),
      setTimeout(() => setAnimationStage(3), 500),
      setTimeout(() => setAnimationStage(4), 700),
    ];

    // Cleanup function to clear timeouts if component unmounts or state changes
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [activeSlideIndex]);

  return (
    <div className="relative w-full h-[100vh]">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSwiper={(swiper) => {
          swiper.on("slideChange", () => {
            setActiveSlideIndex(swiper.realIndex);
          });
        }}
        className="w-full h-[100vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Container (Overlaying the slider) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute z-10 text-center text-white max-w-3xl px-6 transition-all duration-300 ease-in-out ${
              index === activeSlideIndex 
                ? "opacity-100" 
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Subtitle */}
            <p 
              className={`italic text-lg transform transition-all duration-300 ease-in-out ${
                animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {slide.subtitle}
            </p>

            {/* Title */}
            <h1 
              className={`text-5xl md:text-7xl font-extrabold leading-tight mb-4 transform transition-all duration-300 ease-in-out ${
                animationStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {slide.title}
            </h1>

            {/* Description */}
            <p 
              className={`text-lg mb-6 transform transition-all duration-300 ease-in-out ${
                animationStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {slide.description}
            </p>

            {/* Button */}
            <button 
              className={`bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full font-semibold uppercase transform transition-all duration-300 ease-in-out ${
                animationStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {slide.button}
            </button>
          </div>
        ))}
      </div>

      {/* Custom Nav Buttons */}
      <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white/15 hover:bg-black rounded-full cursor-pointer">
        <ChevronLeft className="w-4 h-4 text-white" />
      </div>
      <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white/15 hover:bg-black rounded-full cursor-pointer">
        <ChevronRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}