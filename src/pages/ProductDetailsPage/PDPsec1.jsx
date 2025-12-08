import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import PDPsec2 from "./PDPsec2";
import PDPsec3 from "./PDPsec3";
import MobileFooter from "../MobileDesign/MobileFooter";
import { useCart } from "../../components/CartDrawer/CartContext";
import "./PDPsec.css";
import { useModal, PincodeModal } from "../../context/GlobalModal";
import Navbar from "../MobileDesign/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { addToCartAPI } from "../../api/cartApi";

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
  const [quantityError, setQuantityError] = useState("");
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
    } else {
      setSelected(null);
    }

    if (product?.images?.length) {
      setMainImage(product.images[0]);
    } else {
      setMainImage("");
    }

    // Reset cut selection when product changes (avoid stale value)
    setSelectedDrop("");
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

  // ----- Guest cart helpers -----
  const getGuestCart = () => {
    try {
      const raw = localStorage.getItem("guest_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Error parsing guest_cart:", err);
      return [];
    }
  };

  const saveGuestCart = (cart) => {
    try {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save guest_cart:", err);
    }
  };

  const mergeGuestCartItem = (newItem) => {
    const cart = getGuestCart();
    // merge if same product id + size + cuttingType exists
    const idx = cart.findIndex(
      (c) =>
        c.id === newItem.id &&
        c.size === newItem.size &&
        (c.cuttingType || "") === (newItem.cuttingType || "")
    );

    if (idx > -1) {
      cart[idx].quantity = Math.min(
        10,
        (cart[idx].quantity || 0) + newItem.quantity
      );
    } else {
      cart.push(newItem);
    }
    saveGuestCart(cart);
  };

  // ----- Add to cart handler -----
  const handleAddToCart = async () => {
    // validation
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

    const token = localStorage.getItem("token");

    const cartItem = {
      productId: product?._id,
      quantity,
      size: `${selected?.weight ?? ""}${selected?.unit ? ` ${selected.unit}` : ""
        }`,
      unit: selected?.unit ?? "",
      cuttingType: selectedDrop || "", // <-- standardized field name
      price: selected?.price ?? 0,
      stock: selected.stock,
      discountPrice: selected?.discountPrice ?? 0,
      title: { en: product?.name, ta: product?.tamilName },
      image: product?.images?.[0] || "",
      weightOptionId: selected?._id || null,
    };

    if (!token) {
      // Save guest cart locally and redirect to login to force auth
      try {
        // merge with existing guest cart
        mergeGuestCartItem({
          ...cartItem,
          id: product._id,
        });
      } catch (e) {
        console.warn("Could not merge to guest cart:", e);
      }

      localStorage.setItem(
        "postLoginRedirect",
        JSON.stringify({
          path: window.location.pathname,
        })
      );
      navigate("/login");
      return;
    }

    // If logged in, try server API (best-effort) but still update local cart UI
    try {
      await addToCartAPI(
        product._id,
        quantity,
        selected?.price ?? 0,
        selected?._id ?? null,
        selected?.unit ?? null,
        selectedDrop || ""  // <-- NEW
      );
    } catch (err) {
      console.warn("addToCartAPI failed:", err);
    }


    // Update local cart context (so UI updates immediately) — include cuttingType
    addToCart({
      ...cartItem,
      id: product._id,
    });
    toggleDrawer(true);
  };

  // ----- Buy now handler (redirect to checkout) -----
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");

    // If not logged in, redirect to login immediately
    if (!token) {
      localStorage.setItem(
        "postLoginRedirect",
        JSON.stringify({
          path: window.location.pathname,
        })
      );
      navigate("/login");
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
      alert("This size is out of stock and cannot be added to the cart.");
      return;
    }

    const purchaseItem = {
      id: product._id,
      product,
      quantity,
      size: `${selected?.weight ?? ""}${selected?.unit ? ` ${selected.unit}` : ""
        }`,
      unit: selected?.unit ?? "",
      cuttingType: selectedDrop || "", // <-- standardized field name
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
    // redirect to checkout with query params + state (so checkout page can use either)
    const query = `?buyNow=true&productId=${encodeURIComponent(product._id)}`;
    navigate(`/checkout${query}`, { state: { buyNow: true, purchaseItem } });
  };

  useEffect(() => {
    if (product?.cutType?.length > 0 && !selectedDrop) {
      setSelectedDrop(product.cutType[0]);
    }
  }, [product, selectedDrop]);

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
                className={`lg:w-32 lg:h-32 w-20 h-20 aspect-square object-cover lg:rounded-3xl rounded border-2 cursor-pointer transition-transform hover:scale-105 ${mainImage === img ? "border-red-500" : "border-gray-300"
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
                Rs.{" "}
                {selected?.price?.toFixed(2) ??
                  Number(product?.weightOptions?.[0]?.price).toFixed(2) ??
                  "0.00"}
              </p>
              <p className="text-gray-500 line-through">
                Rs.{" "}
                {selected?.discountPrice?.toFixed(2) ??
                  product?.weightOptions?.[0]?.discountPrice?.toFixed(2) ??
                  ""}
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
                        className={`lg:px-5 lg:py-2 px-3 py-2 rounded-md cursor-pointer text-base border transition duration-300 ${isOutOfStock
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

            {/* Render Type of Cut only when cutType exists */}
            {product?.cutType?.length > 0 && (
              <div className="flex flex-col gap-2 w-50">
                <label className="font-medium text-gray-700">Type of Cut</label>
                <select
                  value={selectedDrop}
                  onChange={(e) => setSelectedDrop(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white text-gray-800"
                >
                  {product.cutType.map((cut) => (
                    <option key={cut} value={cut}>
                      {cut}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <p className="text-base">Quantity</p>
              <div className="flex items-center border border-gray-400  w-fit rounded-md lg:my-3 my-2">
                <button
                  onClick={decrease}
                  className="px-3 py-3 rounded-l-md cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
                >
                  <FaMinus size={15} />
                </button>

                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    if (!selected) return;
                    const stock = selected.stock || 0;
                    const val = parseInt(e.target.value, 10);

                    if (isNaN(val) || val < 1) {
                      setQuantity(1);
                      setQuantityError("");
                      return;
                    }

                    if (val > stock) {
                      setQuantity(stock);
                      setQuantityError(`Only ${stock} items in stock`);
                    } else {
                      setQuantity(val);
                      setQuantityError("");
                    }
                  }}
                  className="w-8 text-center focus:outline-0 mx-2"
                />

                <button
                  onClick={increase}
                  className="px-3 py-3 rounded-r-md cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
                >
                  <FaPlus size={15} />
                </button>
              </div>
              {quantityError && (
                <p className="text-red-500 text-sm mt-1">{quantityError}</p>
              )}
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

      <PDPsec2 images={product?.images || []} />
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
