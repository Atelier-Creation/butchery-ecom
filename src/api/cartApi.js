import axios from "axios";

const CART_API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/cart`,
});

// Attach token dynamically on each request
CART_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token : ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add item to cart
export const addToCartAPI = async (productId, quantity, price, weightOptionId, unit, cuttingType) => {
  const res = await CART_API.post("/add", { productId, quantity, price, weightOptionId, unit, cuttingType });
  return res.data;
};

// Get all cart items
export const getCart = async () => {
  const res = await CART_API.get("/");
  return res.data;
};

// Get cart by user id
export const getCartByUserId = async () => {
  const res = await CART_API.get(`/carduser`);
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const res = await CART_API.delete(`/remove/${productId}`);
  return res.data;
};

// ✅ Update cart item (quantity, price, weightOption, discountPrice)
export const updateCartItemAPI = async (itemId, updates) => {
  const res = await CART_API.put(`/update/${itemId}`, updates);
  return res.data;
};
