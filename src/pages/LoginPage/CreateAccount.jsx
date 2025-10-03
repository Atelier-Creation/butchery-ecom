import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileFooter from "../MobileDesign/MobileFooter";
import Navbar from "../MobileDesign/Navbar";
import { registerUser } from "../../api/authApi"; // your API

function CreateAccount() {
  const navigate = useNavigate();
  const location = useLocation(); // <- used to preserve query string
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  // inline validation errors keyed by field name
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // banner messages (no modal)
  const [successMessage, setSuccessMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // validate fields, returns true if valid and sets errors
  const validate = () => {
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else {
      // basic email pattern
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) newErrors.email = "Please enter a valid email";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    // return true when no error messages
    return Object.values(newErrors).every((v) => v === "");
  };

  const handleCreate = async () => {
    // clear previous messages/errors
    setErrors({ firstName: "", lastName: "", email: "", password: "" });
    setServerMessage("");
    setSuccessMessage("");

    if (!validate()) {
      // stop here, inline errors will show under fields
      return;
    }

    const userData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
    };

    try {
      setLoading(true);
      const response = await registerUser(userData);
      console.log("Registration success:", response);

      // show inline success banner then redirect to login after short delay,
      // preserving any query string that was present on the CreateAccount page.
      setSuccessMessage("Account created successfully. Redirecting to login...");
      const search = location.search || "";
      setTimeout(() => {
        navigate(`/login${search}`);
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      // Preferred pattern: server returns either
      // { message: "..." } OR { errors: { email: "already used", ... } }
      const resp = error?.response?.data;

      if (resp && resp.errors && typeof resp.errors === "object") {
        // map backend field errors into inline errors
        setErrors((prev) => ({ ...prev, ...resp.errors }));
        // also show a top-level server message if provided
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

  // Build login link for "Already have an account?" that also preserves query params
  const loginHref = `/login${location.search || ""}`;

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-3 my-10 lg:w-120 md:w-110 w-full lg:mx-auto md:mx-auto px-5">
        <h1 className="text-3xl font-bold mb-4">Create account</h1>

        {/* Top banners */}
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
            placeholder="First Name"
            className={`py-3 w-full pl-2 border rounded-md ${
              errors.firstName ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="w-full">
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((p) => ({ ...p, lastName: "" }));
            }}
            type="text"
            placeholder="Last Name"
            className={`py-3 w-full pl-2 rounded-md mt-3 ${
              errors.lastName ? "border-red-400" : "border border-gray-200"
            }`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="w-full">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            type="text"
            placeholder="Email"
            className={`py-3 w-full pl-2 rounded-md ${
              errors.email ? "border-red-400" : "border border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: "" }));
            }}
            type="password"
            placeholder="Password"
            className={`py-3 w-full pl-2 rounded-md mt-3 ${
              errors.password ? "border-red-400" : "border border-gray-200"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
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
