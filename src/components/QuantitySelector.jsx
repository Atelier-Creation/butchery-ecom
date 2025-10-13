import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex items-center border border-gray-400 py-2 px-2 w-fit rounded-md lg:my-3 my-2">
      <button
        onClick={decrease}
        className="px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
      >
        <FaMinus size={15} />
      </button>

      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center focus:outline-0 mx-2"
      />

      <button
        onClick={increase}
        className="px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
      >
        <FaPlus size={15} />
      </button>
    </div>
  );
}

export default QuantitySelector;
