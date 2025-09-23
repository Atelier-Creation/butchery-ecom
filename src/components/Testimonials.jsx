import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import Aos from "aos";

const testimonials = [
  {
    text: "Iraichi Kadai chicken is my son’s favourite – it’s juicy and clean.",
    name: "Dipanjana Yadav",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_1.png",
  },
  {
    text: "Iraichi Kadai makes cooking easy with pre-cut Mutton & cleaned meats!",
    name: "Shalini Bramin",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_2.png",
  },
  {
    text: "love Iraichi Kadai Country Chicken! They are soft, juicy & cleaned.",
    name: "Rukmani Kannan",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_3.png",
  },
  {
    text: "I love how juicy Iraichi Kadai, Chicken Breast Boneless is!",
    name: "Alfateh Mustafa",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_4.png",
  },
  {
    text: "Iraichi Kadai chicken is my son’s favourite – it’s juicy and clean.",
    name: "Dipanjana Nandi",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_1.png",
  },
  {
    text: "Iraichi Kadai makes cooking easy with pre-cut & cleaned meats!",
    name: "Shalini Bardhan",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_2.png",
  },
  {
    text: "Absolutely love Iraichi Kadai Country Chicken! They are soft, juicy & cleaned.",
    name: "Rukma Dakshy",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_3.png",
  },
  {
    text: "I love how juicy Licious’ Chicken Breast Boneless is!",
    name: "Alfateh Mustafa",
    city: "Coimbatore",
    bg: "/Testimonial/testimonial_4.png",
  },
];

const Testimonials = () => {
    useEffect(() => {
  Aos.init({
    duration: 800, // animation duration in ms
    once: true,    // run only once when scrolled into view
  });
}, []);

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-4 md:mb-8 lg:mb-2 lg:text-4xl lg:font-bold">What our customers say</h2>
        <p className="text-gray-600 mb-8">
          Hear it directly from people like you
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative rounded-3xl shadow-lg flex flex-col bg-cover bg-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-200/60"
                style={{
                  backgroundImage: t.bg ? `url(${t.bg})` : "none",
                  height: "100%",
                  minHeight: "350px",
                }}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="p-6 flex flex-col h-full">
                  <p className="text-red-800 font-bold absolute left-5 text-left w-40 top-16">“{t.text}”</p>
                  <div className="absolute bottom-5 left-2">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-700">{t.city}</p>
                  </div>
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
