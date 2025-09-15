import React, { createContext, useContext, useState } from "react";
import { FaBicycle, FaTimes } from "react-icons/fa";
import {
  FaBook,
  FaChevronDown,
  FaMinus,
  FaChevronUp,
  FaNotesMedical,
  FaPlus,
} from "react-icons/fa";
import { useCart } from "../components/CartDrawer/CartContext";
import { useModal, PincodeModal } from "./GlobalModal";
// Create context
const QuickContext = createContext();

// Provider to wrap the app
export const ModalQuickProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null); // content to render
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <QuickContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center lg:justify-end justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white p-6 rounded-xl w-10/12 max-w-md shadow-lg relative 
                    max-h-[95vh] overflow-y-auto"
          >
            {modalContent}
            <div className="flex justify-end mt-4 absolute top-1 right-1">
              <button onClick={closeModal} className="cursor-pointer">
                <FaTimes size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </QuickContext.Provider>
  );
};

// Custom hook to use modal
export const useQuickModal = () => useContext(QuickContext);

/* ----------------- PincodeModal component ----------------- */
export const QuickModal = ({ onCheck }) => {
  const { openModal } = useModal();
  const [selected, setSelected] = useState("0.500 Grms");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { addToCart, toggleDrawer } = useCart();
  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const options = ["0.500 Grms", "0.750 Grms", "1 KG"];

  const product = {
    id: "goat-mutton-keema-001",
    title: "Goat - Mutton Keema",
    image:
      "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: 275,
    oldPrice: 1350,
    size: selected,
    quantity: quantity,
  };
  const handleAddToCart = () => {
    addToCart(product); // ✅ adds to localStorage + backend if logged in
    toggleDrawer(true); // ✅ open cart drawer
  };

  const handleBuyNow = () => {
    openModal(<PincodeModal />);
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-col justify-evenly gap-3 p-1">
      <div className=" flex flex-col gap-8 w-full">
        <img
          src={product.image}
          className="w-full lg:h-80 md:h-80 h-70 aspect-square object-cover lg:rounded-3xl rounded"
        />
      </div>
      <div className="relative w-full">
        <div className="flex flex-col gap-3">
          <p className="text-xs">Iraichi Kadai</p>
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-lg font-semibold">Rs. {product.price}</p>
            <p className="text-gray-500 line-through">Rs. {product.oldPrice}</p>
            <button className="bg-[#EE1c25] text-white text-base px-5 py-0.5 rounded-md">
              sale
            </button>
          </div>
          <div>
            <p className="text-base">Size</p>
            <div className="flex lg:flex-row lg:gap-3 lg:my-3 my-2 gap-2 flex-wrap">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md text-base border transition duration-300 
            ${
              selected === option
                ? "bg-[#EE1c25] text-white border-[#EE1c25]"
                : "bg-transparent text-black border-gray-400"
            }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-base">Quantity</p>
            <div className="flex items-center border border-gray-400 py-2 px-2 w-fit rounded-md lg:my-3 my-2">
              {/* Decrease button */}
              <button onClick={decrease} className="px-3 py-1 cursor-pointer">
                <FaMinus size={15} />
              </button>

              {/* Quantity input */}
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center focus:outline-0"
              />

              {/* Increase button */}
              <button onClick={increase} className="px-3 py-1 cursor-pointer">
                <FaPlus size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="border py-3 rounded-md border-[#EE1c25]"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border py-3 rounded-md border-[#EE1c25] bg-[#EE1c25] text-white"
            >
              Buy it now
            </button>
          </div>

          <div>
            <p className="text-base">Order Notes</p>
            <textarea className="border border-gray-400 rounded-md w-full h-30 my-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
