import { useState, useEffect } from "react";
import RecommendedSlider from "./cart-drawer-recommend";
import "./CartDrawer.css";
import { NotebookPen, TruckIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { H6 } from "../TextComponents";
import { useCart } from "./CartContext";
import {
  getCartByUserId,
  removeFromCart as removeFromCartAPI,
  updateCartItemAPI,
} from "../../api/cartApi";

const CartDrawer = ({ onClose, onRemove, onAddToCart }) => {
  const navigate = useNavigate();
  const { drawerOpen, toggleDrawer } = useCart();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Fetch cart from backend on drawer open
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const localData = localStorage.getItem("user_cart");
        if (localData) {
          setCartItems(JSON.parse(localData));
          setLoading(false);
        }

        const data = await getCartByUserId(); // backend gets user from token
        if (data?.data?.items) {
          setCartItems(data.data.items);
          localStorage.setItem("user_cart", JSON.stringify(data.data.items));
        }
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    if (drawerOpen) fetchCart();
  }, [drawerOpen]);

  // Update cart item quantity via API
  const handleUpdateQuantity = async (item, delta) => {
    try {
      const newQuantity = (item.quantity || 0) + delta;
      if (newQuantity < 1) return; // prevent quantity < 1
      await updateCartItemAPI(item._id, { quantity: newQuantity });
      // update local state
      setCartItems((prev) => {
        const updated = prev.map((i) =>
          i._id === item._id ? { ...i, quantity: newQuantity } : i
        );
        localStorage.setItem("user_cart", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  // Remove item from cart
  const handleRemove = async (item) => {
    try {
      if (typeof onRemove === "function") {
        await onRemove(item);
      } else {
        await removeFromCartAPI(item._id);
      }
      // Remove locally
      setCartItems((prev) => {
        const updated = prev.filter((i) => i._id !== item._id);
        localStorage.setItem("user_cart", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  return (
    <>
      <div
        className={`cart-backdrop ${drawerOpen ? "show" : ""}`}
        onClick={() => toggleDrawer(false)}
      ></div>
      <div className={`cart-drawer ${drawerOpen ? "open" : ""} text-gray-700 `}>
        <div className="py-5 border-b border-gray-400 flex justify-between items-center px-3">
          <h5 className="mb-0 text-lg font-medium text-gray-600">
            {cartItems.length ? "Item Added to Your Cart" : "Shopping Cart"}
          </h5>
          <button onClick={() => toggleDrawer(false)}>
            <X className="text-gray-400" />
          </button>
        </div>

        <div className="cart-drawer-body px-3 py-2">
          {loading ? (
            <p>Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 text-center mt-[50%]">
              <img
                src="/cart_empty.svg"
                alt="Empty Cart"
                className="mb-3"
                style={{ width: "90px" }}
              />
              <p>Your cart is empty</p>
              <button
                className="btn btn-dark mt-3 bg-black text-white py-2 px-5 rounded-md"
                onClick={() => {
                  navigate('/collections/all');
                  toggleDrawer(false);
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="d-flex my-3 flex gap-3">
                <img
                  src={item.product.images || "/fallback.png"}
                  alt={item.product.name}
                  className="me-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1 flex flex-col gap-1">
                  <H6
                    en={item.product.name}
                    className="text-base font-semibold"
                  />
                  {item.weight && (
                    <p className="text-muted mb-1">{item.weight} g</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="fw-semibold text-[#EE1c25]">
                      ₹{item.price} X {item.quantity}
                    </span>
                    <button
                      className="text-red-700 btn btn-link p-0"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="quantity-box-cart-drawer">
                    <button
                      onClick={() => handleUpdateQuantity(item, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-top p-3 mt-3">
            <div className="flex justify-between items-center mt-3">
              <strong className="text-2xl font-bold">Subtotal</strong>
              <span className="text-2xl">₹{total.toLocaleString()}</span>
            </div>

            <div
              className={`cart-drawer-footer p-3 ${
                drawerOpen ? "" : "mobile-footer-hidden"
              }`}
            >
              <button
                className="border py-3 rounded-2xl w-full border-[#EE1c25]"
                onClick={() => {
                  navigate("/view-cart", { state: { cartItems } });
                  toggleDrawer(false);
                }}
              >
                View Cart
              </button>
              <button
                className="w-full border py-3 rounded-2xl border-[#EE1c25] bg-[#EE1c25] text-white"
                onClick={() => {
                  navigate("/checkout", { state: { cartItems } });
                  toggleDrawer(false);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
