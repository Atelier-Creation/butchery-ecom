import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

export const createOrder = async (payload) => {
  try {
    const res = await API.post("/payment/create-order", payload); // <-- removed extra /api
    return res.data;
  } catch (err) {
    console.error("Failed to create order:", err);
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export const verifyPayment = async (payload) => {
  try {
    const res = await API.post("/payment/verify", payload); // <-- removed extra /api
    return res.data;
  } catch (err) {
    console.error("Failed to verify payment:", err);
    return { success: false, error: err.response?.data?.message || err.message };
  }
};


