import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaChevronDown,
  FaMinus,
  FaChevronUp,
  FaPlus,
} from "react-icons/fa";
import PDPsec2 from "./PDPsec2";
import PDPsec3 from "./PDPsec3";
import MobileFooter from "../MobileDesign/MobileFooter";
import { useCart } from "../../components/CartDrawer/CartContext";
import "./PDPsec.css";
import { useModal, PincodeModal } from "../../context/GlobalModal";
import MobileNavbar from "../MobileDesign/MobileNavbar";
import IconMenu from "../MobileDesign/MobileIconMenu";
import Navbar from "../MobileDesign/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import MeatCutDropdown from "../MobileDesign/MeatCutDropdown";
import { getProductById } from "../../api/productApi";
import { addToCartAPI } from "../../api/cartApi";

const menuItems = [
  { label: "Chicken", link: "/collections/chicken", icon: "//lenaturelmeat.com/cdn/shop/files/turkey-chicken-svgrepo-com_32x32.svg?v=1752237020" },
  { label: "Mutton", link: "/collections/mutton", icon: "//lenaturelmeat.com/cdn/shop/files/meat-cut-svgrepo-com_1_32x32.svg?v=1752237274" },
  { label: "Egg", link: "/collections/eggs", icon: "//lenaturelmeat.com/cdn/shop/files/eggs-in-basket-svgrepo-com_32x32.svg?v=1752237467" },
  { label: "Fish", link: "/collections/fish", icon: "//lenaturelmeat.com/cdn/shop/files/fish-svgrepo-com_32x32.svg?v=1753957578" },
];

function PDPsec1() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Product ID from URL:", id);

  const { openModal } = useModal();
  const { addToCart, toggleDrawer } = useCart();

  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedDrop, setSelectedDrop] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openDescription, setOpenDescription] = useState(false);

  // main image state
  const [mainImage, setMainImage] = useState("");

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await getProductById(id);
        console.log("API response:", response);
        const prod = response.data?.[0] || response.data || null;
        setProduct(prod);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // When product changes, set defaults
  useEffect(() => {
    if (product?.weightOptions?.length) {
      setSelected(product.weightOptions[0]);
    }
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const increase = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
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
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    openModal(<PincodeModal />);
  };

  return (
    <>
      <Navbar />
      
      <div className="flex flex-col md:flex-row lg:flex-row justify-evenly gap-3 mt-5 lg:p-10 md:p-10 p-3">
        <div className="lg:w-3/4 md:w-3/4 lg:px-10 flex flex-col gap-8 w-full">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={product?.name}
            className="w-full lg:h-120 md:h-120 h-70 aspect-square object-cover lg:rounded-3xl rounded"
          />

          {/* Thumbnails */}
          <div className="flex flex-row lg:flex-row lg:gap-5 gap-4">
            {product?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className={`lg:w-32 lg:h-32 w-20 h-20 aspect-square object-cover lg:rounded-3xl rounded border-2 cursor-pointer transition-transform hover:scale-105 ${
                  mainImage === img ? "border-red-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative lg:w-1/2 md:w-1/2 w-full">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-700">Iraichi Kadai</p>
            <h1 className="text-4xl font-bold">
              {product?.name}{" "}
              <span className="text-sm block mt-3 text-gray-800">
                ({product?.tamilName})
              </span>
            </h1>

            {/* Dynamic Price */}
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold">
                Rs. {selected?.price ?? product?.weightOptions?.[0]?.price}
              </p>
              <p className="text-gray-500 line-through">
                Rs.{" "}
                {selected?.discountPrice ??
                  product?.weightOptions?.[0]?.discountPrice}
              </p>
              <button className="bg-[#EE1c25] text-white text-base px-5 py-0.5 rounded-md">
                sale
              </button>
            </div>

            <div>
              <p className="text-base">Size</p>
              <div className="flex lg:flex-row lg:gap-3 lg:my-3 my-2 gap-2 flex-wrap">
                {product?.weightOptions?.map((opt) => (
                  <button
                    key={opt._id}
                    onClick={() => setSelected(opt)}
                    className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md cursor-pointer text-base border transition duration-300 ${
                      selected?._id === opt._id
                        ? "bg-[#EE1c25] text-white border-[#EE1c25]"
                        : "bg-transparent text-black border-gray-400"
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
                {product?.cutType?.map((cut) => (
                  <option key={cut} value={cut}>
                    {cut}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-base">Quantity</p>
              <div className="flex items-center border border-gray-400 py-2 px-2 w-fit rounded-md lg:my-3 my-2">
                <button
                  onClick={decrease}
                  className="px-3 py-1 cursor-pointer text-gray-500"
                >
                  <FaMinus size={12} />
                </button>
                <input
                  type="text"
                  value={quantity}
                  min={1}
                  max={10}
                  readOnly
                  className="w-12 text-center"
                />
                <button
                  onClick={increase}
                  className="px-3 py-1 cursor-pointer text-gray-500"
                >
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
                onClick={() => setOpenDescription(!openDescription)}
                className="flex flex-row justify-between items-center border-t border-b border-gray-200 py-4 px-2 cursor-pointer"
              >
                <div className="flex flex-row gap-3 items-center">
                  <FaBook />
                  <p className="text-base font-semibold">Description</p>
                </div>
                {openDescription ? (
                  <FaChevronUp size={15} />
                ) : (
                  <FaChevronDown size={15} />
                )}
              </div>
              {openDescription && (
                <ul className="mt-2 ml-8 list-disc text-gray-600">
                  {product?.description
                    ? product.description
                        .split("\n")
                        .map((desc, idx) => <li key={`en-${idx}`}>{desc}</li>)
                    : null}

                  {product?.tamilDescription
                    ? product.tamilDescription
                        .split("\n")
                        .map((desc, idx) => <li key={`ta-${idx}`}>{desc}</li>)
                    : null}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <PDPsec2 />
      <PDPsec3
        title="You may also like"
        categoryId={product?.category}
        currentProductId={product?._id}
        onViewAll={() => console.log("View all clicked")}
      />
      <MobileFooter />
    </>
  );
}

export default PDPsec1;
