import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import MobileFooter from "./MobileFooter";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const product = {
    brand: "Iraichi Kadai",
    name: "Country Chicken",
    Weight: "500gm",
    price: 414.88,
    image: "/country-chicken-plater.jpg",
  };

  const subtotal = (product.price * quantity).toFixed(2);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <h2 className="text-center text-2xl tracking-wide font-bold mb-20">
          YOUR SHOPPING CART
        </h2>

        {/* Table Head */}
        <div className="grid grid-cols-3 text-gray-500 text-sm font-medium border-b border-gray-200 pb-3">
          <p>PRODUCT</p>
          <p className="text-center">QUANTITY</p>
          <p className="text-right">TOTAL</p>
        </div>

        {/* Product Row */}
        <div className="grid grid-cols-3 items-center py-6 border-b border-gray-200">
          {/* Product Info */}
          <div className="flex gap-4 items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-20 object-cover border border-gray-500 rounded"
            />
            <div>
              <p className="text-sm text-gray-500">Brand : {product.brand}</p>
              <p className="font-semibold text-base">{product.name}</p>
              <p className="text-sm text-gray-500">
                Weight: <span className="text-red-600">{product.Weight}</span>
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center">
            <div className="flex border border-gray-700 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg font-medium border-r  border-gray-700"
              >
                -
              </button>
              <span className="px-6 py-1 text-base">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg font-medium border-l  border-gray-700"
              >
                +
              </button>
            </div>
            <button className="ml-4 text-gray-500 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right font-medium text-base">₹{subtotal}</div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-6">
          <button className="bg-black text-white px-6 py-2 font-medium text-sm">
            CONTINUE SHOPPING
          </button>
        </div>

        {/* Extra Inputs Section */}
        <div className="grid grid-cols-3 gap-6 mt-10 border-t border-gray-700 pt-8">
          {/* Special Instruction */}
          <div className="col-span-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="text-gray-500">✎</span> Order Special Instruction
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-700 rounded p-2 text-sm"
              placeholder=""
            ></textarea>
          </div>

          {/* Shipping Rates */}
          <div className="col-span-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="text-gray-500">🚚</span> Estimate Shipping Rates
            </label>
            <select className="w-full border border-gray-700 rounded p-2 text-sm mb-3">
              <option>---</option>
              <option>Standard - Free</option>
              <option>Express - ₹299</option>
            </select>
            <input
              type="text"
              placeholder="Pincode"
              className="w-full border border-gray-700 rounded p-2 text-sm"
            />
          </div>

          {/* Subtotal + Checkout */}
          <div className="col-span-1 flex flex-col items-end justify-start">
            <p className="text-lg font-semibold">Subtotal ₹ {subtotal}</p>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Taxes and Shipping Calculated at Checkout
            </p>
            <button className="bg-black text-white px-8 py-2 rounded font-medium text-sm" onClick={()=>navigate('/checkout')}>
              CHECK OUT
            </button>

            {/* Payment Icons */}
            <div className="flex gap-2 mt-4">
              <img src="/payment-icon/visa.svg" alt="Visa" className="h-5" />
              <img
                src="/payment-icon/master.svg"
                alt="Mastercard"
                className="h-5"
              />
              <img src="/payment-icon/paypal.svg" alt="RuPay" className="h-5" />
              <img src="/payment-icon/UPI.png" alt="UPI" className="h-5" />
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </>
  );
}
