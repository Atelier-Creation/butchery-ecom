import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/orders`,
});

// 🔹 Create a new order (after payment verification)
export const createOrderData = async (orderData) => {
  try {
    const res = await API.post("/", orderData);
    return res.data;
  } catch (err) {
    console.error("❌ createOrder failed:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // ✅ get token

    const res = await API.get(`/order/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send token in header
      },
    });

    return res.data;
  } catch (err) {
    console.error(
      "❌ getOrdersByUserId failed:",
      err.response?.data || err.message
    );
    throw err.response?.data || err;
  }
};
