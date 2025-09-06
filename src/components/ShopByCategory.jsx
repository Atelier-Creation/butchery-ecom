import { Play } from "lucide-react"; // Play icon

export default function ShopByCategory() {
  const categories = [
    {
      name: "Chicken Breast",
      items: "8 items",
      image:
        "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&q=80",
    },
    {
      name: "Grill & BBQ",
      items: "4 items",
      image:
        "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=500&q=80",
    },
    {
      name: "Nattu Kozhi",
      items: "5 items",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
    },
    {
      name: "Chicken Wings",
      items: "4 items",
      image:
        "https://www.bbassets.com/media/uploads/p/l/10000922_11-fresho-chicken-wings-with-skin-antibiotic-residue-free-8-10-pcs.jpg",
    },
  ];

  return (
    <div className="relative w-full bg-black pt-8 md:pt-16">
      <div className="absolute inset-0">
        <img
          src="./chicken-shade.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
      </div>
      {/* V-shape bottom design */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full h-24 fill-white"
        >
          <path d="M500.2,94.7L0,0v100h1000V0L500.2,94.7z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto text-center px-4 py-4 md:pt-20 relative">
        {/* Subtitle */}
        <p className="text-red-600 italic mb-2">Explore Now</p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-28 md:mb-42">
          SHOP BY CATEGORY
        </h2>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-18 md:gap-y-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* U-shape card */}
              <div className="relative bg-white hover:bg-red-700 rounded-t-lg rounded-b-lg md:rounded-b-full md:rounded-t-2xl shadow-md w-32 md:w-48 h-32 md:h-38 flex flex-col items-center justify-start group transition cursor-pointer">
                {/* Circle image */}
                <div className="absolute -top-16 sm:-top-26 w-30 md:w-44 h-30 md:h-44 rounded-full border-4 border-black overflow-hidden shadow-md transition-transform duration-500 group-hover:border-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="mt-16 sm:mt-22 flex flex-col items-center transition">
                  <h3 className="text-black font-bold text-xs md:text-sm uppercase group-hover:text-white">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 text-xs group-hover:text-gray-200">
                    {cat.items}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Circle Play Button with Circular Text */}
        <div className="relative -bottom-16 md:-bottom-20 flex justify-center mt-8 md:mt-16 z-50">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-red-700 rounded-full flex items-center justify-center">
            {/* SVG Circular Text */}
            <svg
              viewBox="0 0 200 200"
              className="absolute w-full h-full animate-spin-slow"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text
                fill="white"
                fontSize="14"
                fontWeight="bold"
                letterSpacing="4"
              >
                <textPath href="#circlePath" startOffset="0%">
                  MEAT VIDEO • EXPLORE • MEAT VIDEO • EXPLORE •
                </textPath>
              </text>
            </svg>

            {/* Center Button */}
            <button className="w-10 h-10 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition relative z-50">
              <Play className="w-5 h-5 sm:w-8 sm:h-8 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
