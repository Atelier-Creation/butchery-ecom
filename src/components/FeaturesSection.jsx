import { FaShieldAlt, FaLeaf, FaExchangeAlt } from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaShieldAlt className="w-6 h-6 text-white" />,
      title: "HIGH-QUALITY MEAT",
      description:
        "100% grass-fed beef, free-range organic chicken, humanely raised pork, and wild caught seafood.",
    },
    {
      icon: <FaLeaf className="w-6 h-6 text-white" />,
      title: "UNBEATABLE VALUE",
      description:
        "Get a range of high-quality cuts, from ground beef to filet mignon, at an amazing value.",
    },
    {
      icon: <FaExchangeAlt className="w-6 h-6 text-white" />,
      title: "COMPLETE FLEXIBILITY",
      description:
        "Shipping is always FREE, we deliver to your door on your schedule, and you can cancel anytime.",
    },
  ];

  return (
    <section className="md:bg-transparent py-12 relative md:absolute bg-gray-200 top-0 w-full z-40 md:top-[80vh]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative cursor-pointer bg-white rounded shadow p-6 flex flex-col overflow-hidden"
          >
            {/* Red circle that grows on hover */}
            <div className="absolute -top-28 md:-top-24 inset-0 z-0 w-16 h-16 m-auto bg-red-700 rounded-full transition-all duration-500 group-hover:w-full group-hover:h-120 group-hover:rounded-none"></div>

            {/* Content, positioned to be on top */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2 transition-colors duration-500 group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm transition-colors duration-500 group-hover:text-gray-200">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}