import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import happyAnim from "../../assets/LottieJson/happy.json";
import Lottie from "lottie-react";
import MobileFooter from "./MobileFooter";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getCartByUserId, removeFromCart as removeFromCartAPI } from "../../api/cartApi";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function PaymentPage() {
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [contactInfo, setContactInfo] = useState("");
  const [mobileInfo, setMobileInfo] = useState("");

  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPinCode, setShippingPinCode] = useState("");
  const [shippingState, setShippingState] = useState("Tamil Nadu");
  const [shippingCountry, setShippingCountry] = useState("India");

  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingPinCode, setBillingPinCode] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const [showFields, setShowFields] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [errors, setErrors] = useState({});

  const fetchCart = async () => {
    try {
      const data = await getCartByUserId();
      if (data.success && data.data.items) {
        setCartItems(data.data.items);
        const subtotal = data.data.items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        );
        setTotal(subtotal);
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          setMapUrl(
            `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
          );
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);

    if (checked) {
      setBillingFirstName(shippingFirstName);
      setBillingLastName(shippingLastName);
      setBillingAddress(shippingAddress);
      setBillingCity(shippingCity);
      setBillingState(shippingState);
      setBillingPinCode(shippingPinCode);
    } else {
      setBillingFirstName("");
      setBillingLastName("");
      setBillingAddress("");
      setBillingCity("");
      setBillingState("");
      setBillingPinCode("");
    }
  };

  const validatePaymentForm = () => {
    const newErrors = {};

    // Contact info
    if (!contactInfo.trim())
      newErrors.contactInfo = "Please enter your email address.";
    if (!mobileInfo.trim())
      newErrors.mobileInfo = "Please enter your mobile number.";

    // Shipping address
    if (deliveryOption === "ship") {
      if (!shippingFirstName.trim())
        newErrors.shippingFirstName = "First name is required.";
      if (!shippingLastName.trim())
        newErrors.shippingLastName = "Last name is required.";
      if (!shippingAddress.trim())
        newErrors.shippingAddress = "Address is required.";
      if (!shippingCity.trim()) newErrors.shippingCity = "City is required.";
      if (!shippingState.trim()) newErrors.shippingState = "State is required.";
      if (!shippingPinCode.trim()) newErrors.shippingPinCode = "PinCode is required.";
    }

    // Billing address
    if (!sameAsShipping) {
      if (!billingFirstName.trim())
        newErrors.billingFirstName = "First name is required.";
      if (!billingLastName.trim())
        newErrors.billingLastName = "Last name is required.";
      if (!billingAddress.trim())
        newErrors.billingAddress = "Address is required.";
      if (!billingCity.trim()) newErrors.billingCity = "City is required.";
      if (!billingState.trim()) newErrors.billingState = "State is required.";
      if (!billingPinCode.trim()) newErrors.billingPinCode = "PinCode is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setShippingCity(data.city);
        setShippingState(data.region);
        setShippingCountry("India");
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          setMapUrl(
            `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
          );
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  return (
    <>
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Confetti
            numberOfPieces={200}
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Lottie
              animationData={happyAnim}
              loop
              autoplay
              style={{ width: 100, height: 100, margin: "0 auto" }}
            />
            <h2 className="text-xl font-bold">Coupon Applied!</h2>
            <p className="text-gray-600">You saved ₹{0}</p>
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              Okay
            </button>
          </div>
        </div>
      )}

       <Navbar />

      <div className="flex gap-12 justify-center mt-20 mb-52 px-4 flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full space-y-8">
          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">CONTACT</h3>
            <input
              type="text"
              placeholder="Email Address"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.contactInfo && (
              <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>
            )}

            <input
              type="text"
              placeholder="Mobile Phone Number"
              value={mobileInfo}
              onChange={(e) => setMobileInfo(e.target.value)}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.mobileInfo && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileInfo}</p>
            )}

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                onChange={(e) => setShowFields(e.target.checked)}
                className="w-4 h-4 border-gray-300"
              />
              Add my GST details (optional)
            </label>
            {showFields && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter GST Number"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
              </div>
            )}
          </div>

          {/* DELIVERY */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DELIVERY</h3>
            <label
              className={`flex items-center justify-between h-[52px] border rounded px-4 cursor-pointer ${
                deliveryOption === "ship"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={() => setDeliveryOption("ship")}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={deliveryOption === "ship"}
                  onChange={() => setDeliveryOption("ship")}
                />
                Ship
              </span>
            </label>

            {deliveryOption === "ship" && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingFirstName}
                    onChange={(e) => setShippingFirstName(e.target.value)}
                    className="flex-1 h-[52px] border border-gray-300 rounded px-4"
                  />
                  {errors.shippingFirstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingFirstName}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingLastName}
                    onChange={(e) => setShippingLastName(e.target.value)}
                    className="flex-1 h-[52px] border border-gray-300 rounded px-4"
                  />
                  {errors.shippingLastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingLastName}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
                {errors.shippingAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shippingAddress}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="City"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
                {errors.shippingCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shippingCity}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Country"
                  disabled
                  value={shippingCountry}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />

                <select
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                >
                  <option value="">Select State</option>
                  {indianStates.map((st) => (
                    <option key={st}>{st}</option>
                  ))}
                </select>
                {errors.shippingState && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shippingState}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="PinCode"
                  value={shippingPinCode}
                  onChange={(e) => setShippingPinCode(e.target.value)}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
                {errors.shippingPinCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shippingPinCode}
                  </p>
                )}
              </div>
            )}
          </div>

          {location && (
            <div className="mt-4 bg-gray-50 border border-gray-300 p-4 rounded-lg text-sm">
              <h3 className="text-lg font-semibold mb-2">
                Your Location on Map
              </h3>

              {location.latitude && location.longitude ? (
                <>
                  <iframe
                    width="100%"
                    height="300"
                    frameBorder="0"
                    style={{ border: 0, marginBottom: "1rem" }}
                    src={`${mapUrl}&hl=en&z=18&output=embed`}
                    allowFullScreen
                  ></iframe>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View on Google Maps
                  </a>
                </>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          )}

          {/* BILLING */}
          {/* <div className="space-y-4">
            <h3 className="text-2xl font-bold">Billing Address</h3>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={handleSameAsShippingChange}
                className="w-4 h-4 border-gray-300"
              />
              Use Shipping address as billing address
            </label>

            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="First Name"
                value={billingFirstName}
                onChange={(e) => setBillingFirstName(e.target.value)}
                disabled={sameAsShipping}
                className="flex-1 h-[52px] border border-gray-300 rounded px-4"
              />
              {errors.billingFirstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.billingFirstName}
                </p>
              )}

              <input
                type="text"
                placeholder="Last Name"
                value={billingLastName}
                onChange={(e) => setBillingLastName(e.target.value)}
                disabled={sameAsShipping}
                className="flex-1 h-[52px] border border-gray-300 rounded px-4"
              />
              {errors.billingLastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.billingLastName}
                </p>
              )}
            </div>

            <input
              type="text"
              placeholder="Address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              disabled={sameAsShipping}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.billingAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.billingAddress}
              </p>
            )}

            <input
              type="text"
              placeholder="City"
              value={billingCity}
              onChange={(e) => setBillingCity(e.target.value)}
              disabled={sameAsShipping}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.billingCity && (
              <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>
            )}

            <select
              value={billingState}
              onChange={(e) => setBillingState(e.target.value)}
              disabled={sameAsShipping}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            >
              <option value="">Select State</option>
              {indianStates.map((st) => (
                <option key={st}>{st}</option>
              ))}
            </select>
            {errors.billingState && (
              <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>
            )}

            <input
              type="text"
              placeholder="PinCode"
              value={billingPinCode}
              onChange={(e) => setBillingPinCode(e.target.value)}
              disabled={sameAsShipping}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.billingPinCode && (
              <p className="text-red-500 text-sm mt-1">{errors.billingPinCode}</p>
            )}
          </div> */}

          {/* ACTION */}
          <div className="mt-8">
            <button
              className="w-full bg-black text-white h-[52px] rounded"
              onClick={() => {
                if (validatePaymentForm()) navigate("/order-confirmed");
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
         {/* RIGHT SIDE: Order Summary */}
        <div className="lg:w-2/5 w-full bg-gray-100 p-6 lg:sticky top-0 h-screen">
          <h5 className="text-xl font-semibold mb-4">Order Summary</h5>
          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 cart-items-wrapper">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center gap-4 border-b pb-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images || "/fallback.png"}
                      alt={item.product.name}
                      className="w-[100px] h-[100px] rounded"
                    />
                    <div>
                      <h3 className="text-base font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-lg font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      className="text-red-600 text-sm underline"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            <div className="flex justify-between mt-4">
              <h6 className="text-lg font-bold">Total</h6>
              <span className="text-lg font-medium">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <MobileFooter />
    </>
  );
}

export default PaymentPage;
