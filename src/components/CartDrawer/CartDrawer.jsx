import { useState, useEffect } from "react";
import RecommendedSlider from "./cart-drawer-recommend";
import "./CartDrawer.css";
import { NotebookPen, TruckIcon, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import {
  getCartByUserId,
  removeFromCart as removeFromCartAPI,
  updateCartItemAPI,
} from "../../api/cartApi";

const CartDrawer = ({ onClose, onRemove, onAddToCart, onCartChange }) => {
  const navigate = useNavigate();
  const { drawerOpen, toggleDrawer } = useCart();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState({});
  const [activeButton, setActiveButton] = useState(null);
  const isLoggedIn =
    !!localStorage.getItem("token") || !!localStorage.getItem("user_id");

  const getItemKey = (item, index) => item._id || item.id || `guest-${index}`;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  // helper getters (unchanged)
  const getImageSrc = (item) => {
    if (!item) return "/fallback.png";
    if (item.product) {
      if (Array.isArray(item.product.images) && item.product.images.length > 0)
        return item.product.images[0];
      if (typeof item.product.images === "string" && item.product.images)
        return item.product.images;
      if (item.product.image) return item.product.image;
    }
    if (item.image) return item.image;
    return "/fallback.png";
  };

  const getDisplayName = (item) => {
    if (!item) return "Untitled";
    if (item.product && (item.product.name || item.product.title)) {
      return (
        item.product.name ||
        (item.product.title && item.product.title.en) ||
        "Untitled"
      );
    }
    if (item.name) return item.name;
    if (item.title && typeof item.title === "object" && item.title.en)
      return item.title.en;
    if (item.title && typeof item.title === "string") return item.title;
    return "Untitled";
  };

  useEffect(() => {
    // lock body scroll when drawer is open (optional)
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (!isLoggedIn) {
          const localData = localStorage.getItem("guest_cart");
          setCartItems(localData ? JSON.parse(localData) : []);
        } else {
          const data = await getCartByUserId();
          if (data?.data?.items) {
            setCartItems(data.data.items);
            localStorage.setItem("user_cart", JSON.stringify(data.data.items));
          }
        }
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };

    if (drawerOpen) fetchCart();
  }, [drawerOpen, isLoggedIn]);

  const handleUpdateQuantity = async (item, delta, type) => {
    const newQuantity = (item.quantity || 0) + delta;
    if (newQuantity < 1) return;

    const itemKey = getItemKey(item);

    // Get available stock for this item
    const stock = item.stock ?? 0;

    // Check stock
    if (newQuantity > stock) {
      setQuantityErrors((prev) => ({
        ...prev,
        [itemKey]: `Only ${stock} item${stock > 1 ? "s" : ""} in stock`,
      }));
      return; // do not increase beyond stock
    } else if (delta < 0) {
      // clear error when decreasing
      setQuantityErrors((prev) => {
        const copy = { ...prev };
        delete copy[itemKey];
        return copy;
      });
    }

    setActiveButton({ key: itemKey, type });
    setTimeout(() => setActiveButton(null), 200);

    setCartItems((prev) => {
      const updated = prev.map((i, idx) =>
        getItemKey(i, idx) === itemKey ? { ...i, quantity: newQuantity } : i
      );
      localStorage.setItem(
        isLoggedIn ? "user_cart" : "guest_cart",
        JSON.stringify(updated)
      );
      return updated;
    });

    if (isLoggedIn) {
      try {
        await updateCartItemAPI(item._id, { quantity: newQuantity });
      } catch (err) {
        console.error("Failed to update quantity on server", err);
      }
    }
  };

  const handleRemove = async (item) => {
    try {
      if (isLoggedIn) {
        if (typeof onRemove === "function") {
          await onRemove(item);
        } else {
          await removeFromCartAPI(item._id);
        }
      }

      setCartItems((prev) => {
        const updated = prev.filter(
          (i, idx) => getItemKey(i, idx) !== getItemKey(item)
        );
        localStorage.setItem(
          isLoggedIn ? "user_cart" : "guest_cart",
          JSON.stringify(updated)
        );
        if (typeof onCartChange === "function") onCartChange();
        return updated;
      });
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const SkeletonItem = () => (
    <div className="flex gap-3 my-3 animate-pulse">
      <div className="w-[100px] h-[100px] bg-gray-300 rounded-md"></div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  // If drawer is closed, render nothing — guarantees footer/buttons are removed
  if (!drawerOpen) return null;

  const closeDrawer = () => {
    toggleDrawer(false);
    if (typeof onCartChange === "function") onCartChange();
    if (typeof onClose === "function") onClose();
    // ensure body overflow reset
    document.body.style.overflow = "";
  };
  console.log("Rendering CartDrawer with items:", cartItems);
  return (
    <>
      <div
        className={`cart-backdrop ${drawerOpen ? "show" : ""}`}
        onClick={closeDrawer}
      ></div>

      <div className={`cart-drawer ${drawerOpen ? "open" : ""} text-gray-700`}>
        <div className="py-5 border-b border-gray-400 flex justify-between items-center px-3">
          <h5 className="mb-0 text-lg font-medium text-gray-600">
            {cartItems.length ? "Item Added to Your Cart" : "Shopping Cart"}
          </h5>
          <button onClick={closeDrawer} aria-label="Close cart" title="Close">
            <X className="text-gray-400" />
          </button>
        </div>

        <div className="cart-drawer-body px-3 py-2">
          {loading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
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
                  navigate("/collections/all");
                  toggleDrawer(false);
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={getItemKey(item, idx)}
                className="d-flex my-3 flex gap-3"
              >
                <img
                  src={getImageSrc(item)}
                  alt={getDisplayName(item)}
                  className="me-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1 flex flex-col gap-1">
                  <div className="text-base font-semibold">
                    {getDisplayName(item)}
                  </div>
                  {item.weight && (
                    <p className="text-muted mb-1">
                      {item.weight} {item.unit}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#EE1c25]">
                      ₹ {item.price?.toFixed(2)} X {item.quantity}
                    </span>
                    <div className="flex items-center border justify-between border-gray-400 rounded-full w-fit">
                      <button
                        className="px-3 line-clamp-none py-1 text-lg rounded-l-full cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
                        onClick={() =>
                          handleUpdateQuantity(item, -1, "decrement")
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-6 text-gray-800 font-semiold text-center focus:outline-0 mx-2"
                      />
                      <button
                        className="px-3 line-clamp-none py-1 text-lg rounded-r-full cursor-pointer transition-colors duration-200 bg-transparent text-gray-800 hover:bg-red-100 active:bg-red-500 active:text-white"
                        onClick={() =>
                          handleUpdateQuantity(item, 1, "increment")
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() => handleRemove(item)}
                      aria-label={`Remove ${getDisplayName(item)} from cart`}
                      title="Remove"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                  {quantityErrors[getItemKey(item)] && (
                        <span className="text-red-500 text-xs mt-1">
                          {quantityErrors[getItemKey(item)]}
                        </span>
                      )}
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-top p-3 mt-3">
            <div className="flex justify-between items-center mt-3">
              <strong className="text-xl font-bold">Subtotal</strong>
              <span className="text-3xl font-bold text-black">
                ₹{total.toLocaleString()}
              </span>
            </div>

            <div className="cart-drawer-footer p-3">
              <button
                className="border py-3 rounded-2xl w-full border-[#EE1c25] mt-3"
                onClick={() => {
                  navigate("/view-cart", { state: { cartItems } });
                  toggleDrawer(false);
                }}
              >
                View Cart
              </button>
              <button
                className="w-full border py-3 rounded-2xl border-[#EE1c25] bg-[#EE1c25] text-white mt-3"
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
