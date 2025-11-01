import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Iraichi Kadai chicken is my son’s favourite – it’s juicy and clean.",
    name: "Dipanjana Yadav",
  },
  {
    text: "Iraichi Kadai makes cooking easy with pre-cut Mutton & cleaned meats!",
    name: "Shalini Bramin",
  },
  {
    text: "Love Iraichi Kadai Country Chicken! They are soft, juicy & cleaned.",
    name: "Rukmani Kannan",
  },
  {
    text: "I love how juicy Licious’ Chicken Breast Boneless is!",
    name: "Alfateh Mustafa",
  },
  {
    text: "Iraichi Kadai chicken is my son’s favourite – it’s juicy and clean.",
    name: "Dipanjana Nandi",
  },
  {
    text: "Iraichi Kadai makes cooking easy with pre-cut & cleaned meats!",
    name: "Shalini Bardhan",
  },
  {
    text: "Absolutely love Iraichi Kadai Country Chicken! They are soft, juicy & cleaned.",
    name: "Rukma Dakshy",
  },
  {
    text: "I love how juicy Licious’ Chicken Breast Boneless is!",
    name: "Alfateh Mustafa",
  },
];


const Testimonials = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full pt-4 md:pt-8 pb-4  bg-white testimonial">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-4 md:mb-8 lg:mb-2 lg:text-4xl lg:font-bold">
          Customer Reviews
        </h2>
        <p className="text-gray-600 mb-8">
          Hear it directly from our happy guests
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2,spaceBetween:16 },
            1024: { slidesPerView: 4,spaceBetween:16 },
          }}
          // style={{overflowY:"visible",marginTop:"2rem"}}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx} >
              <div
                className="relative bg-white min-h-[250px] max-h-[250px] rounded-2xl shadow-md md-2 md:px-8 py-5 flex flex-col justify-between text-center border border-gray-200"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute border-8 border-white bg-gray-100 rounded-full right-0 lg:-right-4 -top-5 p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-8 h-8" alt="" srcset="" />
                </div>
                {/* Top Quotation Mark */}
                <div className="absolute -top-4 left-4 text-yellow-500 text-8xl">
                 <img src="quats.svg" alt="quats" className='w-7 h-7' />
                </div>

                {/* Review Text */}
                <p className="text-gray-800 md:mt-5 mt-10 px-10 lg:px-0 text-base leading-relaxed">
                  {t.text}
                </p>

                {/* Name */}
                <p className="mt-6 text-lg font-semibold text-gray-900">
                  ~ {t.name}
                </p>

                {/* Rating */}
                <div className="flex justify-center mt-4 space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} fill="#FBBF24" stroke="#FBBF24" />
                  ))}
                </div>

                {/* Bottom Quotation Mark */}
                <div className="absolute -bottom-3 right-3 text-yellow-500 text-8xl">
                  <img src="quats2.svg" alt="quats" className='w-7 h-7' />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
