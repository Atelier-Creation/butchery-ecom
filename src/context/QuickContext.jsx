import React, { createContext, useContext, useState, useEffect } from "react";
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaBook,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useCart } from "../components/CartDrawer/CartContext";
import { useModal, PincodeModal } from "./GlobalModal";
import MeatCutDropdown from "../pages/MobileDesign/MeatCutDropdown";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { addToCartAPI } from "../api/cartApi";
import QuantitySelector from "../components/QuantitySelector";

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

  useEffect(() => {
    const handleReopen = (e) => {
      const { type, productId } = e.detail || {};
      if (type === "quickView" && productId) {
        // Reopen the same modal
        setModalContent(<QuickModal productId={productId} />);
        setIsOpen(true);
      }
    };

    window.addEventListener("reopenModalAfterLogin", handleReopen);
    return () =>
      window.removeEventListener("reopenModalAfterLogin", handleReopen);
  }, []);

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
  const [quantityError, setQuantityError] = useState("");
  const [selectedDrop, setSelectedDrop] = useState("");
  const [active, setActive] = useState(false);
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
    } else {
      setSelected(null);
    }
  }, [product]);

  const increase = () => {
    if (!selected) return; // safety check
    const stock = selected.stock || 0;

    if (quantity < stock) {
      setQuantity((q) => q + 1);
    } else {
      setQuantityError(`Only ${stock} items in stock`);
    }
  };
  const decrease = () => {
    quantityError && setQuantityError("");
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // Common validation
    if (!selected) {
      alert("Please select a size");
      return;
    }
    if (!selectedDrop && product?.cutType?.length) {
      alert("Please select a cut type");
      return;
    }
    if (selected?.stock === 0) {
      alert(
        "This weight is out of stock and cannot be added to the cart. Try another weight."
      );
      return;
    }

    const cartItem = {
      productId: product._id,
      quantity,
      size: `${selected.weight}`,
      unit: selected.unit,
      cuttingType: selectedDrop || "", // <-- standardized field
      price: selected.price,
      stock: selected.stock,
      discountPrice: selected.discountPrice,
      id: product._id,
      title: { en: product.name, ta: product.tamilName },
      image: product.images?.[0],
      weightOptionId: selected._id,
    };

    // If user is NOT logged in → redirect to login
    if (!token) {
      alert("Please log in to add items to your cart.");
      localStorage.setItem(
        "postLoginRedirect",
        JSON.stringify({
          path: window.location.pathname,
          modal: {
            type: "quickView",
            productId: product._id,
          },
        })
      );
      navigate("/login");
      closeModal();
      return;
    }

    // Logged-in user → normal API flow
    try {
      // include cuttingType in API call (keeps existing signature plus new param)
      await addToCartAPI(
        product._id,
        quantity,
        selected.price,
        selected._id,
        selected.unit,
        selectedDrop || ""
      );

      addToCart(cartItem);
      toggleDrawer(true);
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Buy Now — add item to cart and go straight to /checkout WITHOUT opening the drawer
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");

    // If not logged in, redirect to login immediately
    if (!token) {
      localStorage.setItem(
        "postLoginRedirect",
        JSON.stringify({
          path: window.location.pathname,
          modal: {
            type: "quickView",
            productId: product._id,
          },
        })
      );
      navigate("/login");
      closeModal();
      return;
    }

    // validate selections similar to Add to Cart
    if (!selected && product?.weightOptions?.length) {
      alert("Please select a size");
      return;
    }
    if (!selectedDrop && product?.cutType?.length) {
      alert("Please select a cut type");
      return;
    }
    if (selected?.stock === 0) {
      alert(
        "This weight is out of stock and cannot be added to the cart. Try another weight."
      );
      return;
    }

    const purchaseItem = {
      id: product._id,
      product,
      quantity,
      size: `${selected?.weight ?? ""}${
        selected?.unit ? ` ${selected.unit}` : ""
      }`,
      unit: selected?.unit ?? "",
      cuttingType: selectedDrop || "", // <-- standardized field
      price: selected?.price ?? 0,
      discountPrice: selected?.discountPrice ?? 0,
      image: product?.images?.[0] || "",
      weightOptionId: selected?._id || null,
      title: { en: product?.name, ta: product?.tamilName },
    };

    // Save a snapshot so checkout can prefill
    try {
      const snapshot = {
        contactInfo: "",
        mobileInfo: "",
        shippingFirstName: "",
        shippingLastName: "",
        shippingAddress: "",
        shippingCity: "",
        shippingState: "",
        shippingPinCode: "",
        total: (selected?.price || 0) * quantity,
        cartItems: [purchaseItem],
        buyNow: true,
      };

      // Save under 'pendingCheckout' (optional) and also under 'bynowProduct' per request
      localStorage.setItem("pendingCheckout", JSON.stringify(snapshot));
      localStorage.setItem("bynowProduct", JSON.stringify(purchaseItem));
    } catch (e) {
      console.warn("Could not save pending checkout / bynowProduct:", e);
    }

    // IMPORTANT: Do NOT add to server cart for Buy Now — skip addToCartAPI entirely.
    // (If you previously had a fire-and-forget addToCartAPI call, it's removed here.)

    // redirect to checkout with query params + state (so checkout page can use either)
    const query = `?buyNow=true&productId=${encodeURIComponent(product._id)}`;
    navigate(`/checkout${query}`, { state: { buyNow: true, purchaseItem } });
    closeModal();
  };

  useEffect(() => {
    if (product?.cutType?.length > 0 && !selectedDrop) {
      setSelectedDrop(product.cutType[0]);
    }
  }, [product, selectedDrop]);
  const handleClick = () => {
    setActive(true);
    // Your increment logic here
    console.log("Increased!");

    // Optional: revert after 200ms
    setTimeout(() => setActive(false), 200);
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
          {product.name}{" "}
          <span className="text-sm block mt-3">{product.tamilName}</span>
        </h1>

        <div className="flex flex-row gap-2 items-center">
          <p className="text-lg font-semibold">Rs. {selected?.price}</p>
          <p className="text-gray-500 line-through">
            Rs. {selected?.discountPrice}
          </p>
          <button className="bg-[#EE1c25] text-white text-base px-5 py-0.5 rounded-md">
            sale
          </button>
        </div>

        <div>
          <p className="text-base">Size</p>
          <div className="flex lg:flex-row lg:gap-3 lg:my-3 my-2 gap-2 flex-wrap">
            {product?.weightOptions?.map((opt) => {
              const isOutOfStock = opt.stock === 0;

              return (
                <div className="flex flex-col" key={opt._id}>
                  <button
                    onClick={() => !isOutOfStock && setSelected(opt)}
                    disabled={isOutOfStock}
                    className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md cursor-pointer text-base border transition duration-300 ${
                      isOutOfStock
                        ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                        : selected?._id === opt._id
                        ? "bg-[#EE1c25] text-white border-[#EE1c25]"
                        : "bg-transparent text-black border-gray-400"
                    }`}
                  >
                    {opt.weight} {opt.unit}
                  </button>
                  <p className="mt-1 text-[#EE1c25]">
                    {isOutOfStock && `${opt.weight}${opt.unit} (Out of Stock)`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {product.cutType?.length > 0 && (
          <div className="flex flex-col gap-2 w-50">
            <label className="font-medium text-gray-700">Type of Cut</label>
            <select
              value={selectedDrop}
              onChange={(e) => setSelectedDrop(e.target.value)}
              className="border border-gray-300 cursor-pointer rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white text-gray-800"
            >
              {product.cutType.map((cut) => (
                <option key={cut} value={cut}>
                  {cut}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* <QuantitySelector/> */}
        <div className="flex items-center border border-gray-400  w-fit rounded-full lg:my-3 my-2">
          <button
            onClick={decrease}
            className="px-3 py-3 rounded-l-full cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
          >
            <FaMinus size={15} />
          </button>

          <input
            type="text"
            value={quantity}
            readOnly
            className="w-8 text-center focus:outline-0 mx-2"
          />

          <button
            onClick={increase}
            className="px-3 py-3 rounded-r-full cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
          >
            <FaPlus size={15} />
          </button>
        </div>
        {quantityError && (
          <p className="text-red-500 text-sm mt-0">{quantityError}</p>
        )}
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

        <div>
          <div
            onClick={() => setOpenDescription(!openDescription)}
            className="flex flex-row justify-between items-center border-t border-b border-gray-200 py-4 px-2 cursor-pointer"
          >
            <div className="flex flex-row gap-3 items-center">
              <FaBook />
              <p className="text-base font-semibold">Description</p>
            </div>
            {openDescription ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
          </div>
          {openDescription && (
            <ul className="mt-2 ml-8 list-disc text-gray-600">
              {product.description
                ?.split("\n")
                ?.map((desc, idx) => <li key={idx}>{desc}</li>) || <li>{product.description}</li>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
