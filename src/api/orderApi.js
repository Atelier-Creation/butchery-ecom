import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/orders`,
});


// Get orders by user ID
export const getOrdersByUserId = async (userId) => {
    const res = await API.get(`/order/${userId}`);
    return res.data;
}
