import React, { useEffect, useState, useCallback, useRef } from "react";
import Confetti from "react-confetti";
import happyAnim from "../../assets/LottieJson/happy.json";
import Lottie from "lottie-react";
import MobileFooter from "./MobileFooter";
// import { Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getCartByUserId, removeFromCart as cartApi } from "../../api/cartApi";
import { LocationPermissionModal } from "./LocationPermissionModal";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import { updateProfile } from "../../api/authApi";
import { createOrderData } from "../../api/orderApi";
import { PhoneNumberField } from "./PhoneNumberField"; // Import the updated PhoneNumberField

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
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const pinCodeRef = useRef(null);

  // Form states
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
  const [gstNumber, setGstNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  // UI states
  const [paymentload, setpaymentload] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ------------------ Guest cart helpers ------------------
  const getGuestCart = useCallback(() => {
    try {
      const raw = localStorage.getItem("guest_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Error parsing guest_cart:", err);
      return [];
    }
  }, []);

  const saveGuestCart = useCallback((cartArray) => {
    try {
      localStorage.setItem("guest_cart", JSON.stringify(cartArray));
      // notify other same-tab listeners
      try {
        window.dispatchEvent(new Event("guestCartChanged"));
      } catch (e) {}
    } catch (err) {
      console.error("Failed to save guest_cart", err);
    }
  }, []);

  // ------------------ Load cart ------------------
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    let items = [];

    // ✅ Step 1: Check URL param for buyNow
    const queryParams = new URLSearchParams(window.location.search);
    const isBuyNow = queryParams.get("buyNow") === "true";

    if (isBuyNow) {
      const buyNowProduct = localStorage.getItem("bynowProduct");
      if (buyNowProduct) {
        try {
          const parsedItem = JSON.parse(buyNowProduct);
          items = [parsedItem];
        } catch (err) {
          console.error("Error parsing bynowProduct:", err);
        }
      }

      setCartItems(items);
      const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
      setTotal(subtotal);
      return; // 🛑 Stop here — skip server/guest cart fetch
    }

    if (token) {
      try {
        const data = await getCartByUserId();
        if (data && data.success && data.data && Array.isArray(data.data.items)) {
          items = data.data.items;
        } else {
          items = (data && data.data && data.data.items) || (data && data.items) || [];
        }
      } catch (err) {
        console.error("Failed to fetch cart from server", err);
        items = getGuestCart();
      }
    } else {
      items = getGuestCart();
    }

    setCartItems(items);
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    setTotal(subtotal);

    // Redirect if cart is empty after fetching
    if (!items || items.length === 0) {
      navigate("/collections/all");
    }
  }, [getGuestCart, navigate]);

  // recompute total whenever cartItems changes
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
    setTotal(subtotal);
  }, [cartItems]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Listen for storage changes and custom events to update cart live
  useEffect(() => {
    const onStorage = (e) => {
      if (!e) {
        fetchCart();
        return;
      }
      if (e.key === "guest_cart") {
        // if guest cart changed in another tab
        const guest = getGuestCart();
        setCartItems(guest);
      } else if (e.key === "user" || e.key === "token") {
        // login/logout occurred in another tab
        fetchCart();
      }
    };

    const onGuestCartChanged = () => {
      const guest = getGuestCart();
      setCartItems(guest);
    };

    const onAuthChanged = () => {
      fetchCart();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("guestCartChanged", onGuestCartChanged);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("guestCartChanged", onGuestCartChanged);
      // window.removeEventListener("authChanged", onAuthChanged);
    };
  }, [fetchCart, getGuestCart]);

  // ------------------ Prefill form: retry data > user profile ------------------
  useEffect(() => {
    const retryData = localStorage.getItem("retryPaymentData");
    if (retryData) {
      const data = JSON.parse(retryData);
      setContactInfo(data.contactInfo || "");
      setMobileInfo(data.mobileInfo + "" || "");
      setShippingFirstName(data.shippingFirstName || "");
      setShippingLastName(data.shippingLastName || "");
      setShippingAddress(data.shippingAddress || "");
      setShippingCity(data.shippingCity || "");
      setShippingState(data.shippingState || "Tamil Nadu");
      setShippingPinCode(data.shippingPinCode || "");
      setTotal(data.total || 0);
      localStorage.removeItem("retryPaymentData");
    } else {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setContactInfo(user.email || "");
          setMobileInfo(user.phone || "");

          if (user.name) {
            const [firstName, ...rest] = user.name.split(" ");
            setShippingFirstName(firstName || "");
            setShippingLastName(rest.join(" ") || "");
          }

          if (user.addresses && user.addresses.length > 0) {
            const defaultAddress = user.addresses.find((a) => a.isDefault) || user.addresses[0];
            setShippingAddress(defaultAddress.street || "");
            setShippingCity(defaultAddress.city || "");
            setShippingState(defaultAddress.state || "Tamil Nadu");
            setShippingPinCode(defaultAddress.pincode || "");
          }
        } catch (err) {
          console.error("Failed to parse user from localStorage:", err);
        }
      }
    }
  }, []);

  // ------------------ Fetch location ------------------
  useEffect(() => {
    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };
            setLocation(loc);
            setMapUrl(`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`);
            setShowLocationModal(false);
          },
          async (err) => {
            console.error("Geolocation error:", err);
            if (err.code === err.PERMISSION_DENIED) {
              try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();
                setShippingCity(data.city);
                setShippingState(data.region);
                setShippingCountry("India");
              } catch (err) {
                console.error("Fallback location failed:", err);
              }
              setShowLocationModal(true);
            }
          }
        );
      } else {
        setShowLocationModal(true);
      }
    };
    fetchUserLocation();
  }, []);

  // Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ------------------ Validation ------------------
  const validatePaymentForm = () => {
    const newErrors = {};
    if (!contactInfo.trim()) newErrors.contactInfo = "Please enter your email address.";
    if (!mobileInfo.trim()) newErrors.mobileInfo = "Please enter your mobile number.";

    // require shipping fields for both ship and cod
    if (["ship", "COD"].includes(deliveryOption)) {
      if (!shippingFirstName.trim()) newErrors.shippingFirstName = "First name is required.";
      if (!shippingLastName.trim()) newErrors.shippingLastName = "Last name is required.";
      if (!shippingAddress.trim()) newErrors.shippingAddress = "Address is required.";
      if (!shippingCity.trim()) newErrors.shippingCity = "City is required.";
      if (!shippingState.trim()) newErrors.shippingState = "State is required.";
      if (!shippingPinCode.trim()) newErrors.shippingPinCode = "PinCode is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ Remove item (supports server + guest) ------------------
  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Call API to remove item, pass itemId
        const response = await cartApi(itemId); // cartApi should accept itemId
        if (response?.success) {
          setCartItems((prev) => prev.filter((item) => item._id !== itemId));
        } else {
          console.warn("Server did not remove item, fallback locally");
          setCartItems((prev) => prev.filter((item) => item._id !== itemId));
        }
      } catch (err) {
        console.error("Failed to remove from server cart:", err);
        setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      }
    } else {
      // guest fallback
      const guest = getGuestCart();
      const newGuest = guest.filter((it) => it._id !== itemId && it.id !== itemId);
      saveGuestCart(newGuest);
      setCartItems(newGuest);
    }
  };

  // ------------------ Payment handler (supports online + COD) ------------------
  const handlePayment = async () => {
    setpaymentload(true);

    // validate first
    if (!validatePaymentForm()) {
      // Scroll to first error
      if (errors.contactInfo && emailRef.current) {
        emailRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        emailRef.current.focus();
      } else if (errors.mobileInfo && phoneRef.current) {
        phoneRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneRef.current.focus();
      } else if (errors.shippingFirstName && firstNameRef.current) {
        firstNameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        firstNameRef.current.focus();
      } else if (errors.shippingLastName && lastNameRef.current) {
        lastNameRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        lastNameRef.current.focus();
      } else if (errors.shippingAddress && addressRef.current) {
        addressRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        addressRef.current.focus();
      } else if (errors.shippingCity && cityRef.current) {
        cityRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        cityRef.current.focus();
      } else if (errors.shippingState && stateRef.current) {
        stateRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        stateRef.current.focus();
      } else if (errors.shippingPinCode && pinCodeRef.current) {
        pinCodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        pinCodeRef.current.focus();
      }
      setpaymentload(false);
      return;
    }

    // If no logged-in user in localStorage, save state and redirect to login
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      try {
        // Save current checkout state so we can restore after login
        const pending = {
          contactInfo,
          mobileInfo,
          shippingFirstName,
          shippingLastName,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingPinCode,
          total,
          cartItems, // store cart snapshot (guest_cart or server-cart snapshot)
          deliveryOption,
        };
        localStorage.setItem("pendingCheckout", JSON.stringify(pending));

        // navigate to login page, passing postLoginRedirect as a query param instead of storing in localStorage
        const redirectPath = "/checkout";
        const search = new URLSearchParams({ postLoginRedirect: redirectPath }).toString();
        navigate(`/login?${search}`);
      } catch (err) {
        console.error("Failed to save pending checkout state:", err);
        // still include redirect param as a fallback
        navigate(`/login?postLoginRedirect=${encodeURIComponent("/checkout")}`);
      } finally {
        setpaymentload(false);
      }
      return; // stop further processing
    }

    // user exists - parse it
    const user = JSON.parse(storedUser);

    // COD flow branch
    if (deliveryOption === "COD") {
      setpaymentload(true);
      try {
        setProcessingPayment(true);
        const procStart = Date.now();

        const pingLocation =
          location?.latitude != null && location?.longitude != null
            ? {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
              }
            : {
                type: "Point",
                coordinates: [0, 0],
              };

        const productsForOrder = cartItems.map((p) => ({
          productId: p.product?._id || p.productId || p.id,
          name: p.product?.name || p.name,
          weightOptionId: p.selectedWeightOptionId || p.weightOptionId || p.weightOption || "",
          price: p.price,
          quantity: p.quantity,
          unit: p.unit || "",
          weight: p.weight,
        }));

        // create order on server for COD
        const orderRes = await createOrderData({
          buyer: user?.id || null,
          buyerDetails: {
            name: user?.name || `${shippingFirstName} ${shippingLastName}`,
            email: user?.email || contactInfo,
            phone: user?.phone || mobileInfo,
          },
          shippingAddress,
          location: mapUrl,
          pingLocation,
          paymentMethod: "COD",
          paymentStatus: "pending",
          products: productsForOrder,
          total,
        });

        // remove items from server-side cart if logged-in OR clear guest cart
        try {
          const token = localStorage.getItem("token");
          if (token && Array.isArray(cartItems) && cartItems.length > 0) {
            const removals = cartItems.map((it) => {
              const idToRemove = it._id || it.id || it.product?._id || it.productId;
              if (!idToRemove) return Promise.resolve({ status: "skipped", reason: "no-id" });
              return cartApi(idToRemove);
            });
            const results = await Promise.allSettled(removals);
            results.forEach((r, idx) => {
              if (r.status === "rejected") {
                console.warn("Failed to remove cart item:", cartItems[idx], r.reason);
              } else if (r.value && r.value.success === false) {
                console.warn("API responded with failure removing item:", cartItems[idx], r.value);
              }
            });
          } else {
            try {
              localStorage.removeItem("guest_cart");
              window.dispatchEvent(new Event("guestCartChanged"));
            } catch (e) {
              console.warn("Failed to clear guest_cart:", e);
            }
          }
        } catch (err) {
          console.warn("Error while removing items from cart:", err);
        }

        // remove user_cart local storage and notify
        try {
          localStorage.removeItem("user_cart");
          try {
            window.dispatchEvent(new Event("userCartChanged"));
          } catch (e) {}
        } catch (err) {
          console.warn("Failed to remove user_cart from localStorage:", err);
        }

        // ensure at least 1s of processing (you had 5s for online — keep UX snappy for COD)
        const elapsed = Date.now() - procStart;
        const minWait = 1000;
        if (elapsed < minWait) {
          await new Promise((res) => setTimeout(res, minWait - elapsed));
        }

        // clear UI cart then hide overlay and navigate
        setCartItems([]);
        setTotal(0);
        setProcessingPayment(false);

        const createdOrderId = orderRes?.data?.orderId || orderRes?.orderId || orderRes?.order?.orderId || null;
        navigate(`/order-confirmed?order_id=${createdOrderId || "unknown"}&paymentMethod=cod`);
      } catch (err) {
        console.error("COD order creation failed:", err);
        localStorage.setItem(
          "retryPaymentData",
          JSON.stringify({
            contactInfo,
            mobileInfo,
            shippingFirstName,
            shippingLastName,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingPinCode,
            total,
          })
        );
        navigate("/payment-failed", { state: { error: err.message } });
      } finally {
        setpaymentload(false);
        setProcessingPayment(false);
      }
      return;
    }

    // If code reaches here, user exists — proceed with Razorpay flow
    try {
      const data = await createOrder({ amount: total * 100, currency: "INR" });
      if (!data.success) throw new Error("Failed to create Razorpay order");

      const { id: order_id, amount, currency } = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Iraichi Kadai",
        order_id,
        prefill: {
          name: `${shippingFirstName} ${shippingLastName}`,
          email: contactInfo,
          contact: mobileInfo,
        },
        notes: {
          address: `${shippingAddress}, ${shippingCity}, ${shippingState}, ${shippingPinCode}`,
          name: `${shippingFirstName} ${shippingLastName}`,
          contact: mobileInfo,
        },
        handler: async (response) => {
          try {
            await verifyPayment(response);

            // show processing overlay
            setProcessingPayment(true);
            const procStart = Date.now();

            const user = JSON.parse(localStorage.getItem("user") || "null");

            let pingLocation = null;
            if (location?.latitude != null && location?.longitude != null) {
              pingLocation = {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
              };
            } else {
              pingLocation = {
                type: "Point",
                coordinates: [0, 0],
              };
            }

            const productsForOrder = cartItems.map((p) => ({
              productId: p.product?._id || p.productId || p.id,
              name: p.product?.name || p.name,
              price: p.price,
              quantity: p.quantity,
              unit: p.unit || "",
              weight: p.weight,
            }));

            // create order on server (this may take time)
            await createOrderData({
              buyer: user?.id || null,
              buyerDetails: {
                name: user?.name || `${shippingFirstName} ${shippingLastName}`,
                email: user?.email || contactInfo,
                phone: user?.phone || mobileInfo,
              },
              shippingAddress,
              location: mapUrl,
              pingLocation,
              paymentMethod: "online",
              paymentStatus: "paid",
              paymentVerifiedAt: new Date(),
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              products: productsForOrder,
              total,
            });

            // Remove items from server-side cart if logged-in OR clear guest cart
            try {
              const token = localStorage.getItem("token");
              if (token && Array.isArray(cartItems) && cartItems.length > 0) {
                const removals = cartItems.map((it) => {
                  const idToRemove = it._id || it.id || it.product?._id || it.productId;
                  if (!idToRemove) return Promise.resolve({ status: "skipped", reason: "no-id" });
                  return cartApi(idToRemove);
                });
                const results = await Promise.allSettled(removals);
                results.forEach((r, idx) => {
                  if (r.status === "rejected") {
                    console.warn("Failed to remove cart item:", cartItems[idx], r.reason);
                  } else if (r.value && r.value.success === false) {
                    console.warn("API responded with failure removing item:", cartItems[idx], r.value);
                  }
                });
              } else {
                try {
                  localStorage.removeItem("guest_cart");
                  window.dispatchEvent(new Event("guestCartChanged"));
                } catch (e) {
                  console.warn("Failed to clear guest_cart:", e);
                }
              }
            } catch (err) {
              console.warn("Error while removing items from cart:", err);
            }

            // remove user_cart local storage and update profile (unchanged)
            try {
              localStorage.removeItem("user_cart");
              try {
                window.dispatchEvent(new Event("userCartChanged"));
              } catch (e) {}
            } catch (err) {
              console.warn("Failed to remove user_cart from localStorage:", err);
            }

            // ensure at least 5s of processing overlay so user doesn't see a flash
            const elapsed = Date.now() - procStart;
            const minWait = 5000;
            if (elapsed < minWait) {
              await new Promise((res) => setTimeout(res, minWait - elapsed));
            }

            // clear UI cart then hide overlay and navigate
            setCartItems([]);
            setTotal(0);
            setProcessingPayment(false);

            const queryParams = new URLSearchParams({
              order_id: order_id,
              paymentId: response.razorpay_payment_id,
              amount: amount.toString(),
              currency,
              contact: contactInfo,
            }).toString();

            navigate(`/order-confirmed?${queryParams}`);
          } catch (err) {
            // if anything failed, hide overlay and fallback to your existing retry flow
            setProcessingPayment(false);
            console.error(err);
            localStorage.setItem(
              "retryPaymentData",
              JSON.stringify({
                contactInfo,
                mobileInfo,
                shippingFirstName,
                shippingLastName,
                shippingAddress,
                shippingCity,
                shippingState,
                shippingPinCode,
                total,
              })
            );
            navigate("/payment-failed", {
              state: {
                orderId: order_id,
                amount,
                currency,
                contact: contactInfo,
                error: err.message,
              },
            });
          }
        },

        modal: {
          ondismiss: () => {
            localStorage.setItem(
              "retryPaymentData",
              JSON.stringify({
                contactInfo,
                mobileInfo,
                shippingFirstName,
                shippingLastName,
                shippingAddress,
                shippingCity,
                shippingState,
                shippingPinCode,
                total,
              })
            );
            navigate("/payment-failed", {
              state: { reason: "User cancelled the payment" },
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      localStorage.setItem(
        "retryPaymentData",
        JSON.stringify({
          contactInfo,
          mobileInfo,
          shippingFirstName,
          shippingLastName,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingPinCode,
          total,
        })
      );
      navigate("/payment-failed", { state: { error: err.message } });
    } finally {
      setpaymentload(false);
    }
  };

  return (
    <>
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Confetti numberOfPieces={200} width={window.innerWidth} height={window.innerHeight} recycle={false} />
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Lottie animationData={happyAnim} loop autoplay style={{ width: 100, height: 100, margin: "0 auto" }} />
            <h2 className="text-xl font-bold">Coupon Applied!</h2>
            <p className="text-gray-600">You saved ₹{0}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={() => setShowSuccessPopup(false)}>
              Okay
            </button>
          </div>
        </div>
      )}

      <Navbar />
      {/* Processing overlay (appears after successful payment until order work finishes) */}
      {processingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 w-[90%] max-w-sm">
            {/* simple spinner */}
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"></div>
            <h3 className="text-lg font-semibold">Processing your order</h3>
            <p className="text-sm text-gray-600 text-center">We’re finalizing your payment and preparing your order. This may take a few seconds.</p>
          </div>
        </div>
      )}

      <div className="flex gap-12 justify-center mt-20 mb-52 px-4 flex-col-reverse lg:flex-row">
        <div className="lg:w-1/2 w-full space-y-8">
          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">CONTACT</h3>
            <input
              ref={emailRef}
              type="text"
              placeholder="Email Address"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full h-[52px] border border-gray-300 rounded px-4"
            />
            {errors.contactInfo && <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>}
            <PhoneNumberField ref={phoneRef} mobileInfo={mobileInfo} setMobileInfo={setMobileInfo} errors={errors} />
          </div>

          {/* DELIVERY */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DELIVERY</h3>
            <label
              className={`flex items-center justify-between h-[52px] border rounded px-4 cursor-pointer ${
                deliveryOption === "ship" ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setDeliveryOption("ship")}
            >
              <span className="flex items-center gap-2">
                <input type="radio" checked={deliveryOption === "ship"} onChange={() => setDeliveryOption("ship")} />
                Ship
              </span>
            </label>

            <label
              className={`flex items-center justify-between h-[52px] border rounded px-4 cursor-pointer ${
                deliveryOption === "COD" ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setDeliveryOption("COD")}
            >
              <span className="flex items-center gap-2">
                <input type="radio" checked={deliveryOption === "COD"} onChange={() => setDeliveryOption("cod")} />
                Cash on Delivery
              </span>
            </label>

            {/* show shipping fields for both ship and cod */}
            {["ship", "COD"].includes(deliveryOption) && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <div className="flex-1">
                    <input
                      ref={firstNameRef}
                      type="text"
                      placeholder="First Name"
                      value={shippingFirstName}
                      onChange={(e) => setShippingFirstName(e.target.value)}
                      className="w-full h-[52px] border border-gray-300 rounded px-4 py-4 lg:py-0"
                    />
                    {errors.shippingFirstName && <p className="text-red-500 text-sm mt-1">{errors.shippingFirstName}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      ref={lastNameRef}
                      type="text"
                      placeholder="Last Name"
                      value={shippingLastName}
                      onChange={(e) => setShippingLastName(e.target.value)}
                      className="w-full h-[52px] border border-gray-300 rounded px-4 py-4 lg:py-0"
                    />
                    {errors.shippingLastName && <p className="text-red-500 text-sm mt-1">{errors.shippingLastName}</p>}
                  </div>
                </div>
                <div>
                  <input
                    ref={addressRef}
                    type="text"
                    placeholder="Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full h-[52px] border border-gray-300 rounded px-4"
                  />
                  {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
                </div>
                <div>
                  <input
                    ref={cityRef}
                    type="text"
                    placeholder="City"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full h-[52px] border border-gray-300 rounded px-4"
                  />
                  {errors.shippingCity && <p className="text-red-500 text-sm mt-1">{errors.shippingCity}</p>}
                </div>
                <input type="text" placeholder="Country" disabled value={shippingCountry} className="w-full h-[52px] border border-gray-300 rounded px-4" />
                <div>
                  <select
                    ref={stateRef}
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    className="w-full h-[52px] border border-gray-300 rounded px-4"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((st) => (
                      <option key={st}>{st}</option>
                    ))}
                  </select>
                  {errors.shippingState && <p className="text-red-500 text-sm mt-1">{errors.shippingState}</p>}
                </div>
                <div>
                  <input
                    ref={pinCodeRef}
                    type="text"
                    placeholder="PinCode"
                    value={shippingPinCode}
                    onChange={(e) => setShippingPinCode(e.target.value)}
                    className="w-full h-[52px] border border-gray-300 rounded px-4"
                  />
                  {errors.shippingPinCode && <p className="text-red-500 text-sm mt-1">{errors.shippingPinCode}</p>}
                </div>
              </div>
            )}
          </div>

          {location && (
            <div className="mt-4 bg-gray-50 border border-gray-300 p-4 rounded-lg text-sm">
              <h3 className="text-lg font-semibold mb-2">Your Location on Map</h3>
              {location.latitude && location.longitude ? (
                <>
                  <iframe width="100%" height="300" frameBorder="0" style={{ border: 0, marginBottom: "1rem" }} src={`${mapUrl}&hl=en&z=18&output=embed`} allowFullScreen></iframe>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View on Google Maps
                  </a>
                </>
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          )}

          {/* ACTION */}
          <div className="mt-8">
            <button type="button" className="w-full bg-black text-white h-[52px] rounded cursor-pointer" onClick={handlePayment}>
              {paymentload ? "Redirecting to payment page" : deliveryOption === "COD" ? "Place Order (Cash on Delivery)" : " Proceed to Pay"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:w-2/5 w-full bg-gray-100 p-6 lg:sticky top-0 lg:h-screen">
          <h5 className="text-xl font-semibold mb-4">Order Summary</h5>
          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 cart-items-wrapper">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id || item.id} className="flex justify-between items-center gap-4 border-b pb-4">
                  <div className="flex gap-4 items-center">
                    <img src={item.product?.images?.[0] || item.product?.image || item.image} alt={item.product?.name || item.name} className="w-[100px] h-[100px] rounded object-cover" />
                    <div>
                      <h3 className="text-base font-semibold">{item.product?.name || item.title?.en || item.name}</h3>
                      <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price}</p>
                    </div>
                  </div>
                  {/* optionally add remove button */}
                </div>
              ))
            )}
            <div className="flex justify-between mt-4">
              <h6 className="text-lg font-bold">Total</h6>
              <span className="text-lg font-medium">₹{total.toLocaleString()}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <strong>Payment:</strong> {deliveryOption === "COD" ? "Cash on Delivery" : "Online Payment"}
            </div>
          </div>
        </div>
      </div>

      {showLocationModal && (
        <LocationPermissionModal
          onRetry={() => {
            setShowLocationModal(false);
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const loc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  };
                  setLocation(loc);
                  setMapUrl(`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`);
                },
                (error) => {
                  console.error("Retry failed:", error);
                  if (error.code === error.PERMISSION_DENIED) {
                    setShowLocationModal(true);
                  }
                }
              );
            }
          }}
        />
      )}

      <MobileFooter />
    </>
  );
}

export default PaymentPage;
