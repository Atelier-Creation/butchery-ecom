import React from "react";
export default function AboutUs() {
  const images = {
    large:
      "https://images.unsplash.com/photo-1717980651515-7796a793002f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    topSmall:
      "https://images.unsplash.com/photo-1682991136736-a2b44623eeba?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bottomSmall:
      "https://images.unsplash.com/photo-1642102903996-cdad15f5dcdd?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="text-left">
            <p className="text-lg text-red-600 font-semibold mb-1">
              Our Meat Market
            </p>
            <h2 className="text-3xl md:text-3xl font-extrabold leading-tight mb-4">
              WE GO ALL OUT TO RAISE MEAT
              <br /> THAT'S PURE AND SIMPLE
            </h2>
            <p className="text-gray-500 mb-6 max-w-xl">
              We source high-quality meat with strict standards and humane
              practices. Freshness and taste come first — so you get a premium
              product every time.
            </p>

            {/* Red stats box */}
            <div className="mt-6 inline-block bg-red-700 text-white rounded shadow-lg">
              <div className="flex text-center divide-x divide-red-700">
                <div className="px-6 py-6">
                  <div className="text-2xl font-bold mb-2">1,280+</div>
                  <div className="text-sm opacity-90">Customers</div>
                </div>
                <div className="px-6 py-6">
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Proven Quality</div>
                </div>
                <div className="px-6 py-6">
                  <div className="text-2xl font-bold mb-2">6+</div>
                  <div className="text-sm opacity-90">Meats Types</div>
                </div>
                <div className="px-6 py-6">
                  <div className="text-2xl font-bold mb-2">2000+</div>
                  <div className="text-sm opacity-90">Success delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right images (stacked collage) */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="w-[320px] md:w-[380px] lg:w-[420px] relative">
              {/* Big image */}
              <div className="rounded shadow-2xl overflow-hidden">
                <img
                  src={images.large}
                  alt="steak large"
                  className="w-full h-[300px] md:h-[360px] lg:h-[420px] object-cover block"
                />
              </div>

              {/* Top-right small frame */}
              <div className="absolute -top-6 -right-6 w-28 md:w-32 lg:w-36 rounded overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={images.topSmall}
                  alt="butcher top"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Bottom-left small frame */}
              <div className="absolute -bottom-6 -left-6 w-28 md:w-32 lg:w-36 rounded overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={images.bottomSmall}
                  alt="meat bottom"
                  className="w-full h-full object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
