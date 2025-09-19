import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck } from "lucide-react"; // or any truck icon

const BuyNowButton = () => {
  const [animating, setAnimating] = useState(false);

  const handleBuyNow = () => {
    setAnimating(true);

    // Reset animation after it finishes
    setTimeout(() => {
      setAnimating(false);
      alert("Order placed! 🚀"); // Replace with actual checkout logic
    }, 2500);
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={animating}
      className={`relative overflow-hidden border py-3 px-6 rounded-md 
        border-[#EE1c25] bg-[#EE1c25] text-white font-medium 
        flex items-center justify-center transition-all duration-300`}
    >
      {/* Normal text */}
      {!animating && <span>Buy it now</span>}

      {/* Packing animation */}
      <AnimatePresence>
        {animating && (
          <>
            {/* Box shrinking effect */}
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute"
            >
              📦
            </motion.span>

            {/* Truck moving across */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute flex items-center gap-1"
            >
              <Truck size={22} className="text-white" />
              <span className="text-xs"></span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </button>
  );
};

export default BuyNowButton;
