import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaChevronDown,
  FaMinus,
  FaChevronUp,
  FaNotesMedical,
  FaPlus,
} from "react-icons/fa";
import PDPsec2 from "./PDPsec2";
import PDPsec3 from "./PDPsec3";
import MobileFooter from "../MobileDesign/MobileFooter";
import { useCart } from "../../components/CartDrawer/CartContext";
import "./PDPsec.css";
import { useModal, PincodeModal } from "../../context/GlobalModal";
import NewNavbar from "../MobileDesign/NewNavbar";
import MobileNavbar from "../MobileDesign/MobileNavbar";
import IconMenu from "../MobileDesign/MobileIconMenu";
import { useLocation } from "react-router-dom";
import { H1 } from "../../components/TextComponents";
const menuItems = [
  {
    label: "Chicken",
    link: "/collections/chicken",
    icon: "//lenaturelmeat.com/cdn/shop/files/turkey-chicken-svgrepo-com_32x32.svg?v=1752237020",
  },
  {
    label: "Mutton",
    link: "/collections/mutton",
    icon: "//lenaturelmeat.com/cdn/shop/files/meat-cut-svgrepo-com_1_32x32.svg?v=1752237274",
  },
  {
    label: "Egg",
    link: "/collections/eggs",
    icon: "//lenaturelmeat.com/cdn/shop/files/eggs-in-basket-svgrepo-com_32x32.svg?v=1752237467",
  },
  {
    label: "Fish",
    link: "/collections/fish",
    icon: "//lenaturelmeat.com/cdn/shop/files/fish-svgrepo-com_32x32.svg?v=1753957578",
  },
];
function PDPsec1() {
  const { openModal } = useModal();
  const location = useLocation();
  const { product: routedProduct } = location.state || {};
  const [selected, setSelected] = useState("500 Grams");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { addToCart, toggleDrawer } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const increase = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  }
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const options = ["500 Grams", "750 Grams", "1 KG"];

  const product = {
    id: routedProduct?.id || "goat-mutton-keema-001",
    title: routedProduct?.title || "Goat - Mutton Keema",
    image:
      routedProduct?.img ||
      "https://lenaturelmeat.com/cdn/shop/files/NT4.png?v=1719991493&width=533",
    price: routedProduct?.price || 275,
    oldPrice: routedProduct?.oldPrice || 1350,
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
    <>
      {isMobile ? <MobileNavbar /> : <NewNavbar />}
      {isMobile ? <IconMenu items={menuItems} /> : ""}
      <div className="flex flex-col md:flex-row lg:flex-row justify-evenly gap-3 lg:p-10 md:p-10 p-3">
        <div className="lg:w-3/4 md:w-3/4 lg:px-10  flex flex-col gap-8 w-full">
          <img
            src={product.image}
            className="w-full lg:h-120 md:h-120 h-70 aspect-square object-cover lg:rounded-3xl rounded"
          />
          <div className="flex flex-row lg:flex-row lg:gap-5 gap-4">
            <img
              src="https://lenaturelmeat.com/cdn/shop/files/Lalipop1.webp?v=1756895386&width=360"
              className="lg:w-32 lg:h-32 w-20 h-20 aspect-square object-cover lg:rounded-3xl rounded border-2"
            />
            <img
              src="https://lenaturelmeat.com/cdn/shop/files/top-view-delicious-salmon-table.jpg?v=1753342530"
              className="lg:w-32 lg:h-32 w-20 h-20 aspect-square object-cover lg:rounded-3xl rounded border-2"
            />
            <img
              src="https://lenaturelmeat.com/cdn/shop/files/Goat_Keema_3.jpg?v=1746256020"
              className="lg:w-32 lg:h-32 w-20 h-20 aspect-square object-cover lg:rounded-3xl rounded border-2"
            />
          </div>
        </div>
        <div className="relative lg:w-1/2 md:w-1/2 w-full">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-700">Iraichi Kadai</p>
            <h1 className="text-4xl font-bold">
              {" "}
              {product.title.en}{" "}
              <span className="text-sm block mt-3 text-gray-800">
                ( {product.title.ta} )
              </span>{" "}
            </h1>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold">Rs. {product.price}</p>
              <p className="text-gray-500 line-through">
                Rs. {product.oldPrice}
              </p>
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
                    className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md cursor-pointer text-base border transition duration-300 
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
                <button onClick={decrease} className="px-3 py-1 cursor-pointer focus:outline-0 focus:border-0 text-gray-500">
                  <FaMinus size={12} />
                </button>

                {/* Quantity input */}
                <input
                  type="text"
                  value={quantity}
                  min={1}
                  max={10}
                  readOnly
                  className="w-12 text-center focus:outline-0"
                />

                {/* Increase button */}
                <button onClick={increase} className="px-3 py-1 cursor-pointer focus:outline-0 focus:border-0 text-gray-500">
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:pr-10">
              <button
                className="border py-3 rounded-2xl border-[#EE1c25]"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                className="border py-3 rounded-2xl border-[#EE1c25] bg-[#EE1c25] text-white"
              >
                Buy it now
              </button>
            </div>

            <div className="lg:pr-10">
              <p className="text-base">Order Notes</p>
              <textarea className="border border-gray-400 rounded-md w-full h-30 my-3" />
            </div>

            <div className="lg:pr-10">
              <div
                onClick={() => setOpen(!open)}
                className="flex flex-row justify-between items-center border-t border-b border-gray-200 py-4 px-2"
              >
                <div className="flex flex-row gap-3 items-center">
                  <FaBook />
                  <p className="text-base font-semibold">Description</p>
                </div>
                {open ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
              </div>
              {open && (
                <ul className="mt-2 ml-8 list-disc text-gray-600">
                  <li>
                    Le Naturel Mutton Keema is finely minced meat that brings
                    rich flavor and unmatched tenderness to your dishes.
                  </li>
                  <li>
                    Raised naturally without antibiotics or hormones, this keema
                    is sourced from goats that are nurtured with care, ensuring
                    a premium product for your meals.
                  </li>
                  <li>
                    Packed with protein, iron, and essential vitamins, Le
                    Naturel Mutton Keema is perfect for a variety of dishes,
                    from classic keema pav and mutton cutlets to hearty curries
                    and fillings for pastries.
                  </li>
                  <li>
                    Its versatility allows it to shine in any kitchen, whether
                    you're making an everyday meal or preparing something
                    special.
                  </li>
                  <li>
                    With its ethical sourcing and fresh, natural flavor, this
                    keema will add depth and richness to your culinary
                    creations.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <PDPsec2 />
      <PDPsec3 />
      <MobileFooter />
    </>
  );
}

export default PDPsec1;
