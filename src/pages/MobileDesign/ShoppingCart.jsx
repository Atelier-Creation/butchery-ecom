import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import MobileFooter from "./MobileFooter";
import { useNavigate } from "react-router-dom";
import {
  getCartByUserId,
  removeFromCart,
  updateCartItemAPI,
} from "../../api/cartApi";
import { useModal } from "../../context/GlobalModal";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isMobile, setIsMobile] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch cart (guest + logged user)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // ✅ Guest: get from localStorage
          const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
          setCartItems(guestCart);
          return;
        }

        // ✅ Logged in: fetch from API
        const response = await getCartByUserId(token);
        const items = response.data?.items || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [navigate]);

  // Handle quantity change
  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    setActiveItem(itemId);
    setTimeout(() => setActiveItem(null), 200);

    const token = localStorage.getItem("token");

    // ✅ Guest user — update localStorage
    if (!token) {
      setCartItems((prev) => {
        const updated = prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQty } : item
        );
        localStorage.setItem("guest_cart", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    // ✅ Logged user — update via API
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQty } : item
      )
    );
    try {
      await updateCartItemAPI(itemId, newQty, token);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // Handle remove item
  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // ✅ Guest: remove locally
      const updated = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updated);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
      return;
    }

    // ✅ Logged user
    try {
      await removeFromCart(itemId, token);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Compute subtotal safely
  const subtotal = cartItems
    .reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0)
    .toFixed(2);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-2xl tracking-wide font-bold mb-10">
          YOUR SHOPPING CART
        </h2>

        {!isMobile && (
          <div className="grid grid-cols-3 text-gray-500 text-sm font-medium border-b border-gray-200 pb-3">
            <p>PRODUCT</p>
            <p className="text-center">QUANTITY</p>
            <p className="text-right">TOTAL</p>
          </div>
        )}

        {cartItems.map((item) => {
          // Support both guest and logged item structures
          const image =
            item.product?.images?.[0] || item.image || "/placeholder.png";
          const name = item.product?.name || item.title?.en || "Unnamed Product";
          const weight = item.weight || item.size || "N/A";
          const unit = item.unit || "";

          return (
            <div
              key={item._id || item.id}
              className={`${
                isMobile
                  ? "flex flex-col gap-4 border-b border-gray-200 py-4"
                  : "grid grid-cols-3 items-center py-6 border-b border-gray-200"
              }`}
            >
              <div className="flex gap-4 items-center">
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-20 object-cover border border-gray-300 rounded"
                />
                <div>
                  <p className="font-semibold text-base">{name}</p>
                  <p className="text-sm text-gray-500">
                    Weight:{" "}
                    <span className="text-red-600">
                      {weight} 
                    </span>
                  </p>
                  {isMobile && (
                    <p className="mt-1 font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center ${
                  isMobile ? "justify-between mt-2" : "justify-center"
                }`}
              >
                <div className="flex border border-gray-700 rounded-full overflow-hidden">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id || item.id, item.quantity - 1)
                    }
                    className={`px-3 py-1 text-lg font-medium border-r border-gray-700 transition ${
                      activeItem === (item._id || item.id)
                        ? "bg-green-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    -
                  </button>

                  <span
                    onClick={() =>
                      handleQuantityChange(item._id || item.id, item.quantity + 1)
                    }
                    className={`px-6 py-1 text-base cursor-pointer transition ${
                      activeItem === (item._id || item.id)
                        ? "bg-green-200"
                        : "bg-gray-50 hover:bg-gray-200"
                    }`}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item._id || item.id, item.quantity + 1)
                    }
                    className={`px-3 py-1 text-lg font-medium border-l border-gray-700 transition ${
                      activeItem === (item._id || item.id)
                        ? "bg-green-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id || item.id)}
                  className="ml-3 text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {!isMobile && (
                <div className="text-right font-medium text-base">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-6">
          <button
            className="bg-black text-white w-[100%] lg:w-auto px-6 py-3 lg:py-2 rounded-xs font-medium text-sm"
            onClick={() => navigate("/collections")}
          >
            CONTINUE SHOPPING
          </button>
        </div>

        <div
          className={`grid ${
            isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-6"
          } mt-10 border-t border-gray-700 pt-8`}
        >
          <div className="col-span-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="text-gray-500">✎</span> Order Special Instruction
            </label>
            <textarea
              rows="4"
              className="w-full border border-gray-700 rounded p-2 text-sm"
            ></textarea>
          </div>

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

          <div
            className={`col-span-1 flex flex-col ${
              isMobile ? "items-start" : "items-end"
            } justify-start`}
          >
            <p className="text-lg font-semibold">Subtotal ₹ {subtotal}</p>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Taxes and Shipping Calculated at Checkout
            </p>
            <button
              className="bg-black text-white w-[100%] py-4 lg:w-auto px-8 lg:py-2 rounded font-medium text-sm"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  localStorage.setItem("guest_cart", JSON.stringify(cartItems));
                  navigate("/checkout");
                  return;
                }
                navigate("/checkout");
              }}
            >
              CHECK OUT
            </button>

            <div className="flex gap-2 mt-4">
              <img src="/payment-icon/visa.svg" alt="Visa" className="h-5" />
              <img src="/payment-icon/master.svg" alt="Mastercard" className="h-5" />
              <img src="/payment-icon/paypal.svg" alt="PayPal" className="h-5" />
              <img src="/payment-icon/UPI.png" alt="UPI" className="h-5" />
            </div>
          </div>
        </div>
      </div>

      <MobileFooter />
    </>
  );
}
