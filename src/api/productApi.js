import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/products`,
});

// Create a new product
export const createProduct = async (productData) => {
  const res = await API.post("/", productData);
  return res.data;
};

// Get all products
export const getProducts = async () => {
  const res = await API.get("/");
  return res.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

// get products by category id
export const getProductsByCategory = async (category) => {
  const res = await API.get(`/category/${category}`);
  return res.data.data;
};

// Update product
export const updateProduct = async (id, updatedData) => {
  const res = await API.put(`/${id}`, updatedData);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};
