import React from "react";
export default function AboutUs() {
  const images = {
    large:
      "https://images.unsplash.com/photo-1707735507043-2b1536feadb4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    topSmall:
      "https://images.unsplash.com/photo-1635223779989-e43b1dbe480f?q=80&w=839&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bottomSmall:
      "https://images.unsplash.com/photo-1633961562073-df87b5c9cfe8?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  const videoId = "bTm9satDbww";
  return (
    <section className="w-full bg-white py-2 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="relative text-left about-bg px-6 py-2 md:py-12  rounded-lg overflow-hidden z-10">
            {/* Background image */}
            <img
              src="/butcher.jpg"
              alt="background"
              className="absolute top-10 right-[30%] bottom-45 w-[50%] h-[50%] object-cover opacity-15 -z-10"
            />

            <p className="text-lg text-red-600 font-semibold mb-1">
              Our Meat Market
            </p>
            <h2 className="text-3xl md:text-3xl font-extrabold leading-tight mb-4 text-gray-700">
              WE GO ALL OUT TO RAISE MEAT THAT'S PURE AND SIMPLE
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              We source high-quality meat with strict standards and humane
              practices. Freshness and taste come first — so you get a premium
              product every time.
            </p>

            {/* Red stats box */}
            <div className="mt-6 inline-block bg-red-700 text-white rounded shadow-lg ">
              <div className="flex flex-wrap lg:flex-nowrap text-center divide-x divide-red-700 max-w-[100vw] items-center sm:justify-center sm:p-2">
                <div className="px-6 py-6 w-[50%] lg:w-auto">
                  <div className="text-2xl font-bold mb-2">1,280+</div>
                  <div className="text-sm opacity-90">Customers</div>
                </div>
                <div className="px-6 py-6 w-[50%] lg:w-auto">
                  <div className="text-2xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Proven Quality</div>
                </div>
                <div className="px-6 py-6 w-[50%] lg:w-auto">
                  <div className="text-2xl font-bold mb-2">4+</div>
                  <div className="text-sm opacity-90">Meats Types</div>
                </div>
                <div className="px-6 py-6 w-[50%] lg:w-auto">
                  <div className="text-2xl font-bold mb-2">5+</div>
                  <div className="text-sm opacity-90">Coustomised Cuts</div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side YouTube video */}
          <div className="relative w-full flex justify-center lg:justify-center ">
            <div className="w-[320px] md:w-[380px] lg:w-full lg:h-[400px] relative shadow-xl aspect-square overflow-hidden rounded-lg pointer-events-none">
              <iframe
                className="w-[300%] h-[100%] -ml-[100%] object-cover"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=144&end=195&modestbranding=1&rel=0&showinfo=0`}
                title="About iraichi Kadai Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            {/* <div
              className="absolute hidden lg:block top-20 lg:-top-15 z-10 -right-10 lg:-right-25 
  w-40 h-40 md:w-50 md:h-50 lg:w-60 aspect-square 
  overflow-hidden rounded-lg border border-gray-50 float-rotate-slow shadow-2xl"
            >
              <img
                src={images.topSmall}
                alt="butcher top"
                className="w-full h-full object-cover block"
              />
            </div>

            <div
              className="absolute hidden lg:block -bottom-30 left-30 lg:-bottom-20 lg:-left-20 
  w-40 h-40 md:w-80 lg:w-60 lg:h-50 
  overflow-hidden rounded-lg border border-gray-50 float-rotate-delay shadow-2xl"
            >
              <img
                src={images.bottomSmall}
                alt="meat bottom"
                className="w-full h-full object-cover block"
              />
            </div> */}
          </div>

          {/* Right images (stacked collage) flex */}
          <div className="relative w-full  justify-center hidden lg:justify-center lg:hidden">
            <div className="w-[320px] md:w-[380px] lg:w-[420px] relative">
              {/* Big image */}
              <div className="overflow-hidden">
                <img
                  src={images.large}
                  alt="steak large"
                  className="w-full h-[300px] md:h-[360px] lg:h-[380px] lg:w-[380px] object-cover block"
                />
              </div>

              {/* Top-right small frame */}
              <div className="absolute top-20 lg:top-25 z-10 -right-10 lg:-right-30 w-40 h-40 md:w-50 md:h-50 lg:w-60 lg:60 aspect-square overflow-hidden">
                <img
                  src={images.topSmall}
                  alt="butcher top"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Bottom-left small frame */}
              <div className="absolute -bottom-15 left-30 lg:-bottom-25 lg:left-25 w-60 h-40 md:w-80 lg:w-90 lg:h-50 overflow-hidden rounded-2xl">
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
