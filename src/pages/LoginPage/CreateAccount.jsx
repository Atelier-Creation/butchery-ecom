import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import MobileFooter from "../MobileDesign/MobileFooter";
import Navbar from "../MobileDesign/Navbar";
import { registerUser } from "../../api/authApi";

function CreateAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(()=>{
      document.title = "Register - Iraichi Kadai";
      const token = localStorage.getItem("token");
      console.log("Existing token:", token);
      if(token){
        navigate("/", { replace: true });
      }
    })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validate = () => {
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) newErrors.email = "Please enter a valid email";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.values(newErrors).every((v) => v === "");
  };

  const handleCreate = async () => {
    setErrors({ firstName: "", lastName: "", email: "", password: "" });
    setServerMessage("");
    setSuccessMessage("");

    if (!validate()) return;

    const userData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
    };

    try {
      setLoading(true);
      const response = await registerUser(userData);
      console.log("Registration success:", response);

      setSuccessMessage("Account created successfully. Redirecting to login...");
      const search = location.search || "";
      setTimeout(() => navigate(`/login${search}`), 1200);
    } catch (error) {
      console.error("Registration error:", error);
      const resp = error?.response?.data;

      if (resp && resp.errors && typeof resp.errors === "object") {
        setErrors((prev) => ({ ...prev, ...resp.errors }));
        if (resp.message) setServerMessage(resp.message);
      } else if (resp && resp.message) {
        setServerMessage(resp.message);
      } else {
        setServerMessage(error?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginHref = `/login${location.search || ""}`;

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5">
        <h1 className="text-3xl font-bold mb-4">Create account</h1>

        {serverMessage && (
          <div className="w-full bg-red-100 border border-red-200 text-red-800 rounded-md p-3 mb-3">
            {serverMessage}
          </div>
        )}
        {successMessage && (
          <div className="w-full bg-green-100 border border-green-200 text-green-800 rounded-md p-3 mb-3">
            {successMessage}
          </div>
        )}

        <div className="w-full">
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((p) => ({ ...p, firstName: "" }));
            }}
            type="text"
            autoComplete="given-name"
            placeholder="First Name"
            className={`py-3 w-full pl-3 rounded-md border ${
              errors.firstName ? "border-red-400" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#EE1c25]`}
          />
          {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
        </div>

        <div className="w-full">
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((p) => ({ ...p, lastName: "" }));
            }}
            type="text"
            autoComplete="family-name"
            placeholder="Last Name"
            className={`py-3 w-full pl-3 rounded-md mt-3 border ${
              errors.lastName ? "border-red-400" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#EE1c25]`}
          />
          {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
        </div>

        <div className="w-full">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            type="email"
            autoComplete="email"
            placeholder="Email"
            className={`py-3 w-full pl-3 rounded-md mt-3 border ${
              errors.email ? "border-red-400" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#EE1c25]`}
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Password with Eye Icon */}
        <div className="w-full relative">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: "" }));
            }}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            className={`py-3 w-full pl-3 pr-12 rounded-md mt-3 border ${
              errors.password ? "border-red-400" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#EE1c25]`}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute mt-1 right-3 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 focus:outline-none z-10"
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p id="password-error" className="text-sm text-red-600 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <div className="text-start text-[#EE1c25] w-full">
          <a href={loginHref} className="border-b text-start">
            Already have an account? Login
          </a>
        </div>

        <div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="py-3 px-7 bg-[#EE1c25] text-white rounded-md mt-3 cursor-pointer disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      <MobileFooter />
    </div>
  );
}

export default CreateAccount;
