import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ImageWithText = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const MotionImg = motion.img;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className="bg-[#EE1c25] overflow-hidden text-white rounded-lg p-0 mx-5 md:mx-5 flex flex-col md:flex-row gap-10 justify-center items-center lg:mx-30 lg:mt-8"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      {/* Left Image */}
      <div
        className="w-full md:w-1/2 overflow-hidden rounded-lg lg:rounded-none"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <MotionImg
          src="https://lenaturelmeat.com/cdn/shop/files/raw-chicken-meat-legs-with-spices-herbs.jpg?v=1753961198&width=1500"
          alt="Country Chicken"
          style={{ scale }}
          className="rounded-lg shadow-lg w-full h-82 md:h-[82vh] object-cover lg:rounded-none"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 px-4 pb-4 flex flex-col justify-center lg:p-8">
        <h2
          className="text-2xl md:text-4xl font-bold mb-4"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          Welcome To Iraichi Kadai
        </h2>
        <p
          className="mb-8 text-base md:text-lg leading-relaxed"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          Iraichi Kadai Country Chicken is a premium chicken that's raised in
          the most natural and humane way possible, ensuring the highest level
          of freshness and quality.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div data-aos="fade-up" data-aos-delay="500">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-6 h-6 text-white" />
              <h3 className="font-semibold text-lg">Organic & Fresh</h3>
            </div>
            <p className="text-sm text-gray-100">
              Our products are organically grown without harmful chemicals and
              pesticides.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="600">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-6 h-6 text-white" />
              <h3 className="font-semibold text-lg">100% Natural</h3>
            </div>
            <p className="text-sm text-gray-100">
              Made entirely from nature's finest ingredients without any
              artificial additives.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="700">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-white" />
              <h3 className="font-semibold text-lg">No Added Hormones</h3>
            </div>
            <p className="text-sm text-gray-100">
              Our products are free from artificial growth hormones. Raised
              naturally to ensure safe and pure quality.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="800">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-6 h-6 text-white" />
              <h3 className="font-semibold text-lg">No Antibiotics</h3>
            </div>
            <p className="text-sm text-gray-100">
              We follow natural methods to ensure animal well-being. Pure, safe,
              and healthy quality you can trust.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          className="bg-white text-[#EE1c25] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
          data-aos="zoom-in"
          data-aos-delay="900"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default ImageWithText;
