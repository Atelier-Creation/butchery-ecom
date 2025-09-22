import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

// login user
export const loginUser = async (credentials) => {
  const res = await API.post("/login", credentials);
  return res.data;
}
