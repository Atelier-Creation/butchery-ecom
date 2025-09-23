import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

// login user
export const loginUser = async (credentials) => {
  const res = await API.post("/login", credentials);
  return res.data;
}


// register user
export const registerUser = async (userData) => {
    const res = await API.post("/register", userData);
    return res.data;
}

// forgot password
export const forgotPassword = async (email) => {
    const res = await API.post("/forgot-password", { email });
    return res.data;
}

// reset password
export const resetPassword = async (email, otp, newPassword) => {
    const res = await API.post("/reset-password", { email, otp, newPassword });
    return res.data;
}



