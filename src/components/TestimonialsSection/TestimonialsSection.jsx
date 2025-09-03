import React from 'react'
import './TestimonialsSection.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
function TestimonialsSection() {
    const testimonials = [
        {
          id: 1,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar1.png",
        },
        {
          id: 2,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar2.png",
        },
        {
          id: 3,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar3.png",
        },
        {
          id: 3,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar3.png",
        },
        {
          id: 3,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar3.png",
        },
        {
          id: 3,
          name: "Sharon Gunther",
          job: "Fresh Design",
          content:
            "“ This place is awesome and huge! Michael was super cool and very pleasant to work with. If you want someone to deliver the sound to your project, he is the guy to go to.”",
          image: "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/avatar3.png",
        },
      ];
      const textTestimonial = [
        "Testimonials",
        "Testimonials",
        "Testimonials",  
      ]
  return (
    <section className="testimonials-container">
        
      <div className="testimonials-inner">
        <p className="testimonials-subtitle">Testimonials</p>
        <h2 className="testimonials-title">
          Hear What Our Global Clients Say
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={15}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            1024: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            480: { slidesPerView: 1, spaceBetween: 15 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="star-icon">★</i>
                  ))}
                </div>
                <p className="testimonial-content">{t.content}</p>
                <div className="testimonial-details">
                <div className="testimonial-image">
                    <img src={t.image} alt={t.name} />
                  </div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-job">{t.job}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Background images */}
        <img
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/map-vector.png"
          alt="map background"
          className="testimonials-map-bg map-bg-1"
        />
        <img
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/map-vector.png"
          alt="map background"
          className="testimonials-map-bg map-bg-2"
        />
      </div>

            {/* Flash News Style Scrolling Text */}
            <div className="testimonials-flash">
        <div className="flash-track">
          <span>TESTIMONIALS. </span>
          <span>TESTIMONIALS. </span>
          <span>TESTIMONIALS. </span>
          <span>TESTIMONIALS. </span>
          <span>TESTIMONIALS. </span>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
