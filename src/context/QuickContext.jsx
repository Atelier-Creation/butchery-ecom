import React, { createContext, useContext, useState, useEffect } from "react";
import { FaTimes, FaMinus, FaPlus, FaBook, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useCart } from "../components/CartDrawer/CartContext";
import { useModal, PincodeModal } from "./GlobalModal";
import MeatCutDropdown from "../pages/MobileDesign/MeatCutDropdown";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { addToCartAPI } from "../api/cartApi";

const QuickContext = createContext();

export const ModalQuickProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs">
          <div className="absolute top-5 right-0 bg-white p-6 rounded-xl w-100 shadow-lg max-h-[95vh] overflow-y-auto">

            {/* Close button at top-right */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 cursor-pointer z-50 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <FaTimes size={18} className="text-gray-600" />
            </button>

            {modalContent}
          </div>
        </div>
      )}


    </QuickContext.Provider>
  );
};

export const useQuickModal = () => useContext(QuickContext);

export const QuickModal = ({ productId }) => {
  const { addToCart, toggleDrawer } = useCart();
  const { closeModal } = useQuickModal();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedDrop, setSelectedDrop] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openDescription, setOpenDescription] = useState(false);

  // Fetch product dynamically from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        const prod = response.data?.[0] || response.data || null;
        setProduct(prod);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);


  // Set default weight option
  useEffect(() => {
    if (product?.weightOptions?.length) {
      setSelected(product.weightOptions[0]);
    }
  }, [product]);

  const increase = () => quantity < 10 && setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      closeModal()      
      navigate("/login");
      return;
    }
    if (!selectedDrop && product?.cutType?.length) {
      alert("Please select a cut type");
      return;
    }
    if (!selected) {
      alert("Please select a size");
      return;
    }

    try {
      await addToCartAPI(product._id, quantity, selected.price, selected._id);
      addToCart({
        ...product,
        quantity,
        size: `${selected.weight} g`,
        cutType: selectedDrop || "",
        price: selected.price,
        discountPrice: selected.discountPrice,
        id: product._id,
        title: { en: product.name, ta: product.tamilName },
        image: product.images?.[0],
      });
      toggleDrawer(true);
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    openModal(
      <PincodeModal
        onCheckSuccess={() => {
          addToCart({
            ...product,
            quantity,
            size: `${selected.weight} g`,
            cutType: selectedDrop || "",
            price: selected.price,
            discountPrice: selected.discountPrice,
            id: product._id,
            title: { en: product.name, ta: product.tamilName },
            image: product.images?.[0],
          });
          window.location.href = "/checkout";
        }}
      />
    );
    closeModal();
  };

  if (!product)
    return (
      <div className="animate-pulse flex flex-col gap-4 p-2">
        <div className="w-full h-60 bg-gray-200 rounded-lg" />
        <div className="flex flex-col gap-3">
          <div className="h-4 bg-gray-200 w-24 rounded" />
          <div className="h-6 bg-gray-200 w-48 rounded" />
          <div className="h-4 bg-gray-200 w-32 rounded" />

          <div className="flex gap-2 mt-2">
            <div className="h-10 w-20 bg-gray-200 rounded" />
            <div className="h-10 w-20 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-2 mt-4">
            <div className="h-12 flex-1 bg-gray-200 rounded" />
            <div className="h-12 flex-1 bg-gray-200 rounded" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 w-32 rounded" />
            <div className="h-4 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 w-2/3 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-3 p-1">
      <img
        src={product.images?.[0]}
        className="w-full lg:h-80 md:h-80 h-70 aspect-square object-cover lg:rounded-3xl rounded"
      />

      <div className="flex flex-col gap-3">
        <p className="text-xs">Iraichi Kadai</p>
        <h1 className="text-xl font-bold">
          {product.name} <span className="text-sm block mt-3">{product.tamilName}</span>
        </h1>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-lg font-semibold">Rs. {selected?.price}</p>
          <p className="text-gray-500 line-through">Rs. {selected?.discountPrice}</p>
          <button className="bg-[#EE1c25] text-white text-base px-5 py-0.5 rounded-md">sale</button>
        </div>

        <div>
          <p className="text-base">Size</p>
          <div className="flex lg:flex-row lg:gap-3 lg:my-3 my-2 gap-2 flex-wrap">
            {product.weightOptions?.map((opt) => (
              <button
                key={opt._id}
                onClick={() => setSelected(opt)}
                className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md text-base border transition duration-300 ${selected?._id === opt._id ? "bg-[#EE1c25] text-white border-[#EE1c25]" : "bg-transparent text-black border-gray-400"
                  }`}
              >
                {opt.weight} g
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-50">
          <label className="font-medium text-gray-700">Type of Cut</label>
          <select
            value={selectedDrop}
            onChange={(e) => setSelectedDrop(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white text-gray-800"
          >
            <option value="">Please select</option>
            {product.cutType?.map((cut) => (
              <option key={cut} value={cut}>
                {cut}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center border border-gray-400 py-2 px-2 w-fit rounded-md lg:my-3 my-2">
          <button onClick={decrease} className="px-3 py-1 cursor-pointer"><FaMinus size={15} /></button>
          <input type="text" value={quantity} readOnly className="w-12 text-center focus:outline-0" />
          <button onClick={increase} className="px-3 py-1 cursor-pointer"><FaPlus size={15} /></button>
        </div>

        <div className="flex flex-col gap-3">
          <button className="border py-3 rounded-md border-[#EE1c25]" onClick={handleAddToCart}>Add to cart</button>
          <button onClick={handleBuyNow} className="border py-3 rounded-md border-[#EE1c25] bg-[#EE1c25] text-white">Buy it now</button>
        </div>

        <div>
          <p className="text-base">Order Notes</p>
          <textarea className="border border-gray-400 rounded-md w-full h-30 my-3" />
        </div>

        <div>
          <div onClick={() => setOpenDescription(!openDescription)} className="flex flex-row justify-between items-center border-t border-b border-gray-200 py-4 px-2 cursor-pointer">
            <div className="flex flex-row gap-3 items-center">
              <FaBook />
              <p className="text-base font-semibold">Description</p>
            </div>
            {openDescription ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
          </div>
          {openDescription && (
            <ul className="mt-2 ml-8 list-disc text-gray-600">
              {product.description?.split("\n")?.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              )) || <li>{product.description}</li>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
