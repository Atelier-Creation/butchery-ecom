import React, { useState, useEffect } from "react";
import NewNavbar from "../MobileDesign/NewNavbar";
import MobileNavbar from "../MobileDesign/MobileNavbar";
import IconMenu from "../MobileDesign/MobileIconMenu";
import MobileFooter from "../MobileDesign/MobileFooter";
import { useNavigate } from "react-router-dom";
import Navbar from "../MobileDesign/Navbar";
import { forgotPassword, resetPassword } from "../../api/authApi"; // import both APIs
import { useModal } from "../../context/GlobalModal"; // assuming you have modal context

const menuItems = [
  { label: "Chicken", link: "/collections/chicken", icon: "//lenaturelmeat.com/cdn/shop/files/turkey-chicken-svgrepo-com_32x32.svg?v=1752237020" },
  { label: "Mutton", link: "/collections/mutton", icon: "//lenaturelmeat.com/cdn/shop/files/meat-cut-svgrepo-com_1_32x32.svg?v=1752237274" },
  { label: "Egg", link: "/collections/eggs", icon: "//lenaturelmeat.com/cdn/shop/files/eggs-in-basket-svgrepo-com_32x32.svg?v=1752237467" },
  { label: "Fish", link: "/collections/fish", icon: "//lenaturelmeat.com/cdn/shop/files/fish-svgrepo-com_32x32.svg?v=1753957578" },
];

function ResetPassword() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal(); // modal context
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetStep, setResetStep] = useState(false); // to show OTP modal

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Send forgot password email
  const handleSendEmail = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await forgotPassword(email);
      setMessage(response.message || "Password reset email sent!");
      setResetStep(true); // open OTP modal
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle reset password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      setMessage("Please enter OTP and new password");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const response = await resetPassword(email, otp, newPassword);
      setMessage(response.message || "Password reset successful!");
      setResetStep(false);
      navigate("/login"); // redirect after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5">
        <h1 className="text-3xl font-bold mb-2">Reset your password</h1>
        <p className="text-base mb-4">We will send you an email to reset your password</p>

        {!resetStep && (
          <>
            <input
              type="email"
              required
              placeholder="Email"
              className="py-3 w-full pl-2 border border-gray-200 focus:border-gray-200 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSendEmail}
              className={`py-3 px-7 mt-3 rounded-md text-white ${loading ? "bg-gray-400" : "bg-[#EE1c25]"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Send Email"}
            </button>
          </>
        )}

        {resetStep && (
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="Enter OTP"
              className="py-3 w-full pl-2 border border-gray-200 rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter New Password"
              className="py-3 w-full pl-2 border border-gray-200 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className={`py-3 px-7 mt-3 rounded-md text-white ${loading ? "bg-gray-400" : "bg-[#EE1c25]"}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </div>
        )}

        {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

        <div className="text-center text-[#EE1c25] mt-2">
          <a href="/" className="border-b">Cancel</a>
        </div>
      </div>

      <MobileFooter />
    </div>
  );
}

export default ResetPassword;
