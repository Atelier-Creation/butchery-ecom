import React from "react";
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";

function Banner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-6 bg-white">
      {/* First Banner */}
      <div className="relative overflow-hidden group">
        <a href="#">
          <div
            className="relative h-[100vh] md:h-[100vh] sm:h-[120vh] bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:-translate-x-8"
            style={{
              backgroundImage: "url(./Country-chicken-Legs.png)",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-[20%] right-[15%] md:top-[15%] md:right-[10%] sm:top-[24%] max-w-[400px] sm:max-w-[90%] text-right text-white">
              <h2 className="text-5xl sm:text-6xl font-bold uppercase leading-tight mb-3">
                Country chicken legs (Gravy Cut)
              </h2>
              <p className="text-xl sm:text-lg font-semibold mb-4">
                Best For Chettinadu Dishes!
              </p>
              <p className="text-xl sm:text-lg font-semibold mb-4">
                ₹199.9 (500gm)
              </p>
              <button className="group bg-[#b41f25] hover:bg-[#94171d] text-white text-sm px-5 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center justify-end gap-2 ml-auto sm:px-4 sm:py-2 sm:rounded-full sm:text-xs hover:translate-x-1 hover:shadow-lg">
                Shop Now
                <span className="flex items-center gap-1 relative">
                  {/* Up Right Arrow (default) */}
                  <LuArrowUpRight className="w-4 h-4 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-x-2" />
                  {/* Right Arrow (shows on hover) */}
                  <LuArrowRight className="w-4 h-4 absolute transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
              </button>
            </div>
          </div>
        </a>
      </div>

      {/* Second Banner */}
      <div className="relative overflow-hidden group">
        <a href="#">
          <div
            className="relative h-[100vh] md:h-[100vh] sm:h-[120vh] bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:translate-x-8"
            style={{
              backgroundImage: "url(./Grill-Chicken-Full.jpg)",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-[20%] left-[15%] md:top-[15%] md:left-[10%] sm:top-[24%] max-w-[400px] sm:max-w-[90%] text-left text-white">
              <h2 className="text-5xl sm:text-6xl font-bold uppercase leading-tight mb-3">
                Fresh Full Skin Chicken for (Grill)
              </h2>
              <p className="text-lg sm:text-base font-semibold mb-2 max-w-[220px] sm:max-w-[70%] sm:mb-3">
                Get your Chicken on your desired way!
              </p>
              <p className="text-xl sm:text-lg font-semibold mb-4">
                ₹279 ~(800gm)
              </p>
              <button className="group bg-[#b41f25] hover:bg-[#94171d] text-white text-sm px-5 py-2 rounded-md transition-all duration-300 ease-in-out flex items-center gap-2 sm:px-4 sm:py-2 sm:rounded-full sm:text-xs hover:translate-x-1 hover:shadow-lg">
                Shop Now
                <span className="flex items-center gap-1 relative w-4 h-4">
                  {/* Up Right Arrow (default) */}
                  <LuArrowUpRight className="w-4 h-4 absolute transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-x-2" />
                  {/* Right Arrow (shows on hover) */}
                  <LuArrowRight className="w-4 h-4 absolute transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Banner;
