import React,{useState,useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiPause,FiChevronLeft,FiChevronRight,FiPlay } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MobileBanner = () => {
  const images = [
    {
      image: "/Country-chicken-Legs.png",
      head: "Enjoy Fresh Meat With The Best Quality",
      para: "Tender country chicken legs, freshly cut and packed to ensure premium taste and nutrition in every bite."
    },
    {
      image: "/country-chicken-plater.jpg",
      head: "Delicious Country Chicken Platter",
      para: "A wholesome platter of farm-fresh country chicken, perfect for family meals and festive gatherings."
    },
    {
      image: "/indian-chicken-gravy.webp",
      head: "Authentic Indian Chicken Gravy",
      para: "Richly spiced and slow-cooked to perfection, this classic chicken curry brings the true taste of India to your table."
    }
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
    <div className="w-full h-90 max-w-md mx-auto overflow-hidden lg:w-full lg:h-[80vh] lg:max-w-none">
      <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000000 }}
        navigation={false}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src.image}
              alt={`Slide ${idx}`}
              className="relative w-full h-90 lg:h-screen object-cover sm:h-80 md:h-96"
            />
<div className="absolute inset-0 bg-black/60"></div>
<div className="absolute w-full top-10 left-0 text-center lg:top-25 lg:left-5 flex flex-col lg:gap-3 gap-2 items-center lg:items-start justify-center lg:text-start text-white px-4 lg:w-1/2">
  <h2 className="lg:text-7xl text-3xl font-bold drop-shadow-lg">
    {src.head}
  </h2>
  <p className="lg:mt-2 text-sm md:text-base drop-shadow-md lg:w-3/4">
    {src.para}
  </p>

  <div className="flex flex-row lg:flex-row gap-2 lg:mt-3">
  {/* Get Started button */}
  <button className="lg:py-2 lg:px-5 py-2 px-5 border rounded border-[#EE1c25] bg-[#EE1c25] text-white transition duration-300 hover:bg-transparent hover:text-[#EE1c25]">
    Get Started
  </button>

  {/* View Products button */}
  <button className="lg:py-2 lg:px-5 py-2 px-5 border bg-transparent rounded border-white text-white transition duration-300 hover:bg-[#EE1c25] hover:text-white hover:border-[#EE1c25]">
    View Products
  </button>
</div>

</div>

            
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
