import React from "react";
import { Leaf, CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";

const ImageWithText = () => {
  return (
    <section className="my-15">
        {/* Left Image */}

        {/* Right Content */}
        <div className="bg-[#C41E3A] text-white rounded-lg p-8 mx-5 flex gap-10 justify-center">
            <div className=" w-1/2 h-[80vh] object-cover md:block"> 
              <img
                src="https://lenaturelmeat.com/cdn/shop/files/raw-chicken-meat-legs-with-spices-herbs.jpg?v=1753961198&width=1500"
                alt="Country Chicken"
                className="rounded-lg shadow-lg w-full h-[80vh] object-cover"
              />
            </div>
            <div className=" w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Welcome To Iraichi Kadai
              </h2>
              <p className="mb-8 text-lg leading-relaxed">
                Iraichi Kadai Country Chicken is a premium chicken that's raised in
                the most natural and humane way possible, ensuring the highest
                level of freshness and quality.
              </p>

              {/* Features in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-6 h-6 text-white" />
                    <h3 className="font-semibold text-lg">Organic & Fresh</h3>
                  </div>
                  <p className="text-sm text-gray-100">
                    Our products are organically grown without harmful chemicals
                    and pesticides.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                    <h3 className="font-semibold text-lg">100% Natural</h3>
                  </div>
                  <p className="text-sm text-gray-100">
                    Made entirely from nature's finest ingredients without any
                    artificial additives.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-6 h-6 text-white" />
                    <h3 className="font-semibold text-lg">No Added Hormones</h3>
                  </div>
                  <p className="text-sm text-gray-100">
                    Our products are free from artificial growth hormones.
                    Raised naturally to ensure safe and pure quality.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse className="w-6 h-6 text-white" />
                    <h3 className="font-semibold text-lg">No Antibiotics</h3>
                  </div>
                  <p className="text-sm text-gray-100">
                    We follow natural methods to ensure animal well-being. Pure,
                    safe, and healthy quality you can trust.
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className="bg-white cursor-pointer text-[#C41E3A] px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                Show More
              </button>
            </div>
        </div>
    </section>
  );
};

export default ImageWithText;
