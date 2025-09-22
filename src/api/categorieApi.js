import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/categories`,
});


//get all categories

export const getCategories = async () => {
    const res = await API.get("/");
    return res.data;
}