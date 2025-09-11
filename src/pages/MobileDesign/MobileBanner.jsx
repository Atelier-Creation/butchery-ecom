import React,{useState,useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiPause,FiChevronLeft,FiChevronRight,FiPlay } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobileBanner = () => {
  const images = [
    "/Country-chicken-Legs.png", 
    "/country-chicken-plater.jpg",
    "/indian-chicken-gravy.webp",
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
    <div className="w-full h-90 max-w-md mx-auto overflow-hidden lg:w-full lg:h-screen lg:max-w-none">
      <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={false}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="relative w-full h-90 lg:h-screen object-cover sm:h-80 md:h-96"
            />
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-black px-3 py-1 rounded-full">
              <FiChevronLeft size={20} className="cursor-pointer" onClick={() => swiperRef.current?.slidePrev()}/>
              {/* Two dots */}
              {/* Dynamic Dots */}
              <div className="flex gap-2">
                {images.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    onClick={() => swiperRef.current?.slideToLoop(dotIdx)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      activeIndex === dotIdx ? "bg-black" : "bg-transparent border"
                    }`}
                  ></span>
                ))}
              </div>
              <FiChevronRight size={20} className="cursor-pointer" onClick={() => swiperRef.current?.slideNext()}/>
              {isPlaying ? (
    <FiPause size={20} className="cursor-pointer" onClick={toggleAutoplay} />
  ) : (
    <FiPlay size={20} className="cursor-pointer" onClick={toggleAutoplay} />
  )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileBanner;
