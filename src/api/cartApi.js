import axios from "axios";

const CART_API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/cart`,
});

// Attach token dynamically on each request
CART_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token : ",token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addToCartAPI = async (productId, quantity) => {
  const res = await CART_API.post("/add", { productId, quantity });
  return res.data;
};

export const getCart = async () => {
  const res = await CART_API.get("/");
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await CART_API.delete(`/remove/${productId}`);
  return res.data;
};
