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
    text: "இறைச்சி கடையிலா வாங்குற Chicken செம்ம fresh! Country chicken taste vera level. Deliveryயும் delay இல்ல. Super service!",
    name: " Ramesh, Singanallur",
  },
  {
    text: "Inga vanguna mutton quality semma! Na Singanallur side la iruken, time-ku delivery kudukraanga. Freshaavum cleanaavum iruku!",
    name: "Karthik, Ramanathapuram ",
  },
  {
    text: "எப்போ order பண்ணினாலும், same quality தான். சுத்தமா pack பண்ணி, neatly deliver பண்ணுறாங்க. வீட்டுல எல்லாருக்கும் பிடிச்சிருக்கு.",
    name: " Lakshmi, Selvapuram ",
  },
  {
    text: "Bro seriously, kadaila kidaikaadha quality inga kidaikuthu. Chicken soft ah iruku, smell illa. Biryani taste level-up",
    name: "Hari, Saibaba Colony",
  },
  {
    text: "Iraichi Kadai is my go-to for all non-veg weekends! Fresh meat, perfect cuts, and good service. Totally worth it for Coimbatore people!",
    name: "Suresh, Peelamedu",
  },
  {
    text: "mutton ரொம்ப clean, நல்லா wash பண்ணி pack பண்ணுறாங்க. கொஞ்சம் கூட smell இல்ல. Family use-ku super place.",
    name: "Revathi, Kuniyamuthur",
  },
  {
    text: "Na hostel la iruken, weekends la biryani panrom. Iraichi Kadai la vangina chicken super soft and tasty da. Delivery fast ah iruku!",
    name: "Arun, Gandhipuram",
  },
  {
    text: "My mom used to go to market every Sunday, now we just order from Iraichi Kadai. Fresh, clean, and tasty every time! Coimbatore ku ippadi oru service romba useful.",
    name: "Anand, Vadavalli",
  },
];


const Testimonials = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full relative pt-4 md:pt-8 pb-4  bg-white testimonial">
      
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
                className="relative bg-white min-h-[250px] h-[350px] rounded-2xl shadow-md md-2 md:px-8 py-5 flex flex-col justify-between text-center border border-gray-200"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute border-8 border-white bg-gray-100 rounded-full right-0 lg:-right-4 -top-5 p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-8 h-8" alt="google" />
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
