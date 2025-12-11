import React, { useEffect, useState, useCallback, useRef } from "react";
import Confetti from "react-confetti";
import happyAnim from "../../assets/LottieJson/happy.json";
import Lottie from "lottie-react";
import MobileFooter from "./MobileFooter";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { getCartByUserId, removeFromCart as cartApi } from "../../api/cartApi";
import { LocationPermissionModal } from "./LocationPermissionModal";
import { createOrder, verifyPayment } from "../../api/paymentApi";
import failAnimation from "../../assets/LottieJson/payment-failed.json";
import { updateProfile } from "../../api/authApi"; // Though not used directly, good to keep if intended
import { createOrderData } from "../../api/orderApi";
import { PhoneNumberField } from "./PhoneNumberField";

// NEW: coupon API (added getAvailableCoupons)
import { verifyCoupon, getAvailableCoupons } from "../../api/couponApi";

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
const formatIndianMobile = (num) => {
  if (!num) return "";
  const cleaned = num.replace(/\D/g, ""); // remove non-digit chars
  if (cleaned.length === 10) return "+91" + cleaned; // prepend +91
  if (cleaned.startsWith("91") && cleaned.length === 12) return "+" + cleaned;
  if (cleaned.startsWith("+")) return cleaned; // already in +91 format
  return cleaned; // fallback
};

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
  const [showCODConfirmModal, setShowCODConfirmModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [contactInfo, setContactInfo] = useState("");
  const [mobileInfo, setMobileInfo] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPinCode, setShippingPinCode] = useState("");
  const [shippingState, setShippingState] = useState("Tamil Nadu");
  const [shippingCountry, setShippingCountry] = useState("India");

  // UI states
  const [paymentload, setpaymentload] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showFields, setShowFields] = useState(false); // Consider removing if not used
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // used for coupon success
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [showLocationModal, setShowLocationModal] = useState(false);

  // NEW STATES for payment failure feedback
  const [paymentErrorMessage, setPaymentErrorMessage] = useState("");
  const [showRetryOption, setShowRetryOption] = useState(false);

  // ===== NEW: Coupon states =====
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponVerifying, setCouponVerifying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // coupon details object from server
  const [couponDiscount, setCouponDiscount] = useState(0); // amount in Rs

  // NEW: available coupons
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [availableLoading, setAvailableLoading] = useState(false);
  const [availableError, setAvailableError] = useState(null);
  // =================================

  useEffect(() => {
    if (!showPaymentModal) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowPaymentModal(false); // auto-close modal
          return 20; // reset countdown for next failure
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showPaymentModal]);

  useEffect(() => {
    if (showPaymentModal) {
      setCountdown(20); // reset countdown
    }
  }, [showPaymentModal]);

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
      try {
        window.dispatchEvent(new Event("guestCartChanged"));
      } catch (e) { }
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
      const subtotal = items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      setTotal(subtotal);
      if (!items || items.length === 0) {
        navigate("/collections/all"); // Redirect if buyNow item is invalid/missing
      }
      return; // 🛑 Stop here — skip server/guest cart fetch
    }

    // ✅ Step 2: Check for retryPaymentData first
    const retryDataRaw = localStorage.getItem("retryPaymentData");
    if (retryDataRaw) {
      try {
        const data = JSON.parse(retryDataRaw);
        items = data.cartItems || [];
        setCartItems(items);
        setContactInfo(data.contactInfo || "");
        setMobileInfo(formatIndianMobile(data.mobileInfo + "") || "");
        setShippingFirstName(data.shippingFirstName || "");
        setShippingLastName(data.shippingLastName || "");
        setShippingAddress(data.shippingAddress || "");
        setShippingCity(data.shippingCity || "");
        setShippingState(data.shippingState || "Tamil Nadu");
        setShippingPinCode(data.shippingPinCode || "");
        setTotal(data.total || 0);
        // restore coupon if present
        if (data.couponCode) {
          setCouponCodeInput(data.couponCode);
          // we don't auto-verify here to avoid calling API; user can press Apply
        }
        // Important: Do NOT remove retryPaymentData here. Only on successful payment.
        // Important: Do NOT redirect to /collections/all here if there's retry data.
        if (!items || items.length === 0) {
          setPaymentErrorMessage(
            "Your previous cart could not be loaded for retry. Please try adding items again."
          );
          // We might still want to clear retryData if items are truly empty and cannot be loaded
          localStorage.removeItem("retryPaymentData");
          navigate("/collections/all"); // Only redirect if cart is truly empty AND retry data leads to empty cart
        }
        return; // Exit, as we loaded from retry data
      } catch (err) {
        console.error("Error parsing retryPaymentData:", err);
        localStorage.removeItem("retryPaymentData"); // Clear invalid retry data
      }
    }

    // ✅ Step 3: Load from server cart (if logged in) or guest cart
    if (token) {
      try {
        const data = await getCartByUserId();
        if (data?.success && Array.isArray(data.data?.items)) {
          items = data.data.items;
        } else {
          items = data?.data?.items || data?.items || [];
        }
      } catch (err) {
        console.error("Failed to fetch cart from server", err);
        items = getGuestCart(); // Fallback to guest cart on server error
      }
    } else {
      // Not logged in
      items = getGuestCart();
    }

    setCartItems(items);
    const subtotal = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    setTotal(subtotal);

    // Redirect if cart is empty after ALL attempts to load
    if (!items || items.length === 0) {
      navigate("/collections/all");
    }
  }, [getGuestCart, navigate]);

  // recompute total whenever cartItems changes
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    setTotal(subtotal);
  }, [cartItems]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Listen for storage changes and custom events to update cart live
  useEffect(() => {
    const onStorage = (e) => {
      if (
        !e ||
        e.key === "guest_cart" ||
        e.key === "user" ||
        e.key === "token"
      ) {
        fetchCart();
      }
    };

    const onGuestCartChanged = () => fetchCart();
    const onAuthChanged = () => fetchCart();

    window.addEventListener("storage", onStorage);
    window.addEventListener("guestCartChanged", onGuestCartChanged);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("guestCartChanged", onGuestCartChanged);
      window.removeEventListener("authChanged", onAuthChanged); // Ensure this is removed
    };
  }, [fetchCart]);

  // ------------------ Prefill form: retry data > user profile ------------------
  // Modified to use the logic in fetchCart first
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && !localStorage.getItem("retryPaymentData")) {
      // Only prefill from user if no retry data
      try {
        const user = JSON.parse(userData);
        setContactInfo(user.email || "");
        setMobileInfo(formatIndianMobile(user.phone || ""));

        if (user.name) {
          const [firstName, ...rest] = user.name.split(" ");
          setShippingFirstName(firstName || "");
          setShippingLastName(rest.join(" ") || "");
        }

        if (user.addresses && user.addresses.length > 0) {
          const defaultAddress =
            user.addresses.find((a) => a.isDefault) || user.addresses[0];
          setShippingAddress(defaultAddress.street || "");
          setShippingCity(defaultAddress.city || "");
          setShippingState(defaultAddress.state || "Tamil Nadu");
          setShippingPinCode(defaultAddress.pincode || "");
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []); // Removed fetchCart from dependencies to avoid loop, it's called separately

  // ------------------ Fetch location ------------------
  // ... (no changes needed here for the payment retry logic)
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
            setMapUrl(
              `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
            );
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
    if (!contactInfo.trim())
      newErrors.contactInfo = "Please enter your email address.";
    if (!mobileInfo.trim())
      newErrors.mobileInfo = "Please enter your mobile number.";

    // require shipping fields for both ship and cod
    if (["ship", "COD"].includes(deliveryOption)) {
      if (!shippingFirstName.trim())
        newErrors.shippingFirstName = "First name is required.";
      if (!shippingLastName.trim())
        newErrors.shippingLastName = "Last name is required.";
      if (!shippingAddress.trim())
        newErrors.shippingAddress = "Address is required.";
      if (!shippingCity.trim()) newErrors.shippingCity = "City is required.";
      if (!shippingState.trim()) newErrors.shippingState = "State is required.";
      if (!shippingPinCode.trim())
        newErrors.shippingPinCode = "PinCode is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = (errors) => {
    // Mapping of error key to its corresponding ref
    const refMap = {
      contactInfo: emailRef,
      mobileInfo: phoneRef,
      shippingFirstName: firstNameRef,
      shippingLastName: lastNameRef,
      shippingAddress: addressRef,
      shippingCity: cityRef,
      shippingState: stateRef,
      shippingPinCode: pinCodeRef,
    };

    // Find the first error and scroll to its corresponding ref
    for (const key of Object.keys(refMap)) {
      if (errors[key] && refMap[key].current) {
        refMap[key].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        refMap[key].current.focus();
        return true; // Found and scrolled to an error
      }
    }
    return false; // No errors found or no ref for the error
  };

  // Helper: build structured shipping address object from current fields
  const buildShippingAddressObject = () => {
    // We keep addressLine1 as the entered shippingAddress string, addressLine2 blank.
    return {
      firstName: shippingFirstName,
      lastName: shippingLastName,
      addressLine1: shippingAddress,
      addressLine2: "",
      city: shippingCity,
      state: shippingState,
      pincode: shippingPinCode,
      country: shippingCountry || "India",
    };
  };

  // ===== NEW helper: shared verify + apply logic =====
  const verifyAndApply = async (rawCode) => {
    const code = (rawCode || "").trim();
    if (!code) {
      window.alert("Please enter a coupon code.");
      return;
    }
    setCouponVerifying(true);
    try {
      const res = await verifyCoupon(code);
      // expected shape: { valid: true, discountType: "percentage", percentage: X, details: coupon }
      if (!res || !res.valid) {
        window.alert(res?.message || "Coupon is not valid");
        setAppliedCoupon(null);
        setCouponDiscount(0);
        return;
      }

      const details = res.details || res.coupon || res; // be flexible
      const percentage = Number(res.percentage ?? details?.percentage ?? 0);
      if (!percentage && percentage !== 0) {
        window.alert("Coupon returned invalid percentage.");
        setAppliedCoupon(null);
        setCouponDiscount(0);
        return;
      }

      // compute discount amount based on current total
      const rawDiscount = (total * percentage) / 100;
      const cap = Number(details?.maxDiscountAmount ?? 0) || Number(details?.maxDiscount ?? 0) || 0;
      const appliedAmount = cap > 0 ? Math.min(rawDiscount, cap) : rawDiscount;

      // check min order amount if present
      const minOrder = Number(details?.minOrderAmount ?? 0) || 0;
      if (total < minOrder) {
        window.alert(`This coupon requires minimum order of ₹${minOrder}`);
        setAppliedCoupon(null);
        setCouponDiscount(0);
        return;
      }

      setAppliedCoupon(details);
      setCouponDiscount(Number(appliedAmount.toFixed(2)));
      setShowSuccessPopup(true); // small confetti popup
      // keep couponCodeInput as the applied code
      setCouponCodeInput(code.toUpperCase());
    } catch (err) {
      console.error("Coupon verify error:", err);
      window.alert(err?.response?.data?.message || err.message || "Failed to verify coupon");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    } finally {
      setCouponVerifying(false);
    }
  };
  // ======================================

  // ===== existing handler now delegates to verifyAndApply =====
  const handleApplyCoupon = async () => {
    await verifyAndApply(couponCodeInput);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCodeInput("");
  };
  // ======================================

  // ===== NEW: fetch available coupons on mount =====
  useEffect(() => {
    let mounted = true;
    const fetchAvailable = async () => {
      setAvailableLoading(true);
      setAvailableError(null);
      try {
        const res = await getAvailableCoupons();
        if (!mounted) return;
        // Expect res to be array - if the API returns { data: [...] } adapt as needed
        const data = Array.isArray(res) ? res : (res?.data || res?.coupons || []);
        setAvailableCoupons(data || []);
      } catch (err) {
        console.error("Failed to load available coupons:", err);
        if (mounted) setAvailableError("Failed to load coupons");
      } finally {
        if (mounted) setAvailableLoading(false);
      }
    };

    fetchAvailable();
    return () => {
      mounted = false;
    };
  }, []);
  // =======================================================

  // ===== NEW: apply coupon when user clicks from available list =====
  const applyAvailableCoupon = async (coupon) => {
    if (!coupon) return;
    // auto-fill input and verify+apply directly using coupon.code (avoid state race)
    const code = coupon.code || coupon._id || "";
    setCouponCodeInput((code || "").toUpperCase());
    await verifyAndApply(code);
  };
  // =======================================================

  // ===== NEW helper: handle coupon-min-order error returned from backend =====
  const handleCouponMinOrderError = (err) => {
    // try to extract message from axios style error or plain error
    const serverMsg =
      err?.response?.data?.message ||
      err?.message ||
      (typeof err === "string" ? err : "");

    const regex = /Minimum order amount ₹?(\d+)/i;
    const m = serverMsg.match(regex);
    if (m) {
      const required = m[1];
      // remove applied coupon locally and reset discount
      setAppliedCoupon(null);
      setCouponDiscount(0);
      setCouponCodeInput("");
      // update retry data without coupon
      try {
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
            cartItems,
            couponCode: "", // removed
          })
        );
      } catch (e) { }
      // show friendly message
      setPaymentErrorMessage(
        `Coupon removed — minimum order ₹${required} required. Adjust your cart or reapply a different coupon.`
      );
      setShowRetryOption(true);
      setShowPaymentModal(true);
      return true;
    }
    return false;
  };
  // =======================================================================

  const confirmCODOrder = async () => {
    setShowCODConfirmModal(false);
    setpaymentload(true);
    try {
      setProcessingPayment(true);

      const procStart = Date.now();
      const user = JSON.parse(localStorage.getItem("user") || "{}");

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
        weightOptionId:
          p.selectedWeightOptionId || p.weightOptionId || p.weightOption || "",
        price: p.price,
        quantity: p.quantity,
        unit: p.unit || "",
        weight: p.weight,
        // send cuttingType if available on the cart item (common keys tried)
        cuttingType:
          p.cuttingType ||
          p.selectedCuttingType ||
          p.cutting ||
          p.cut ||
          (p.options && p.options.cuttingType) ||
          "",
      }));

      const shippingAddressObj = buildShippingAddressObject();

      // include couponCode and discount & finalAmount in payload
      const finalAmountForOrder = Number((total - (couponDiscount || 0)).toFixed(2));

      const orderRes = await createOrderData({
        buyer: user?.id || null,
        buyerDetails: {
          name: user?.name || `${shippingFirstName} ${shippingLastName}`,
          email: user?.email || contactInfo,
          phone: user?.phone || mobileInfo,
        },
        shippingAddress: shippingAddressObj,
        location: mapUrl,
        pingLocation,
        paymentMethod: "COD",
        paymentStatus: "pending",
        products: productsForOrder,
        subtotal: total,
        total,
        discount: couponDiscount || 0,
        couponCode: appliedCoupon?.code || couponCodeInput || "",
        finalAmount: finalAmountForOrder,
      });

      // clear cart
      try {
        const token = localStorage.getItem("token");
        if (token && Array.isArray(cartItems) && cartItems.length > 0) {
          const removals = cartItems.map((it) => {
            const idToRemove =
              it._id || it.id || it.product?._id || it.productId;
            if (!idToRemove) return Promise.resolve();
            return cartApi(idToRemove);
          });
          await Promise.allSettled(removals);
        } else {
          localStorage.removeItem("guest_cart");
          window.dispatchEvent(new Event("guestCartChanged"));
        }
        localStorage.removeItem("user_cart");
        window.dispatchEvent(new Event("userCartChanged"));
        localStorage.removeItem("retryPaymentData");
      } catch (err) {
        console.warn("Error while clearing cart after COD order:", err);
      }

      const elapsed = Date.now() - procStart;
      const minWait = 1000;
      if (elapsed < minWait)
        await new Promise((res) => setTimeout(res, minWait - elapsed));

      setCartItems([]);
      setTotal(0);
      setProcessingPayment(false);

      const createdOrderId =
        orderRes?.data?.orderId ||
        orderRes?.orderId ||
        orderRes?.order?.orderId ||
        null;

      navigate(
        `/order-confirmed?order_id=${createdOrderId || "unknown"}&paymentId=cod`
      );
    } catch (err) {
      console.error("COD order creation failed:", err);

      // If it's a coupon min-order error, handle gracefully (clear coupon + inform user)
      const handled = handleCouponMinOrderError(err);
      if (!handled) {
        // Save retry data (now storing structured shipping fields and product cutting type)
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
            cartItems,
            couponCode: appliedCoupon?.code || couponCodeInput || "",
          })
        );

        setPaymentErrorMessage(
          `COD order failed: ${err.message || "Please try again."}`
        );
        setShowRetryOption(true);
        setShowPaymentModal(true);
      }
    } finally {
      setpaymentload(false);
      setProcessingPayment(false);
    }
  };

  // ------------------ Payment handler (supports online + COD) ------------------
  const handlePayment = async () => {
    setpaymentload(true);
    setShowPaymentModal(false);
    setPaymentErrorMessage(""); // Clear any previous error messages
    setShowRetryOption(false); // Hide retry option on new attempt

    // validate first
    if (!validatePaymentForm()) {
      scrollToFirstError(errors);
      // ... (your existing scroll to error logic)
      setpaymentload(false);
      return;
    }

    // If no logged-in user in localStorage, save state and redirect to login
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      try {
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
          cartItems,
          deliveryOption,
          couponCode: appliedCoupon?.code || couponCodeInput || "",
        };
        localStorage.setItem("pendingCheckout", JSON.stringify(pending));

        const redirectPath = { path: "/checkout" };
        const search = new URLSearchParams({
          postLoginRedirect: redirectPath,
        }).toString();
        navigate(`/login?${search}`);
      } catch (err) {
        console.error("Failed to save pending checkout state:", err);
        navigate(`/login?postLoginRedirect=${encodeURIComponent("/checkout")}`);
      } finally {
        setpaymentload(false);
      }
      return;
    }

    const user = JSON.parse(storedUser);

    // COD flow branch
    if (deliveryOption === "COD") {
      if (!validatePaymentForm()) {
        scrollToFirstError(errors);
        setpaymentload(false);
        return;
      }

      // Instead of immediately creating the order, show confirmation
      setShowCODConfirmModal(true);
      setpaymentload(false);
      return;
    }

    // Razorpay flow
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

            setProcessingPayment(true);
            const procStart = Date.now();

            let pingLocation = null;
            if (location?.latitude != null && location?.longitude != null) {
              pingLocation = {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
              };
            } else {
              pingLocation = { type: "Point", coordinates: [0, 0] };
            }

            const productsForOrder = cartItems.map((p) => ({
              productId: p.product?._id || p.productId || p.id,
              name: p.product?.name || p.name,
              price: p.price,
              quantity: p.quantity,
              unit: p.unit || "",
              weight: p.weight,
              cuttingType:
                p.cuttingType ||
                p.selectedCuttingType ||
                p.cutting ||
                p.cut ||
                (p.options && p.options.cuttingType) ||
                "",
            }));

            const shippingAddressObj = buildShippingAddressObject();

            // include couponCode, discount and finalAmount
            const finalAmountForOrder = Number((total - (couponDiscount || 0)).toFixed(2));

            await createOrderData({
              buyer: user?.id || null,
              buyerDetails: {
                name: user?.name || `${shippingFirstName} ${shippingLastName}`,
                email: user?.email || contactInfo,
                phone: user?.phone || mobileInfo,
              },
              shippingAddress: shippingAddressObj,
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
              discount: couponDiscount || 0,
              couponCode: appliedCoupon?.code || couponCodeInput || "",
              finalAmount: finalAmountForOrder,
            });

            // --- Post-order creation (successful for Online) ---
            // Clear carts
            try {
              const token = localStorage.getItem("token");
              if (token && Array.isArray(cartItems) && cartItems.length > 0) {
                const removals = cartItems.map((it) => {
                  const idToRemove =
                    it._id || it.id || it.product?._id || it.productId;
                  if (!idToRemove)
                    return Promise.resolve({
                      status: "skipped",
                      reason: "no-id",
                    });
                  return cartApi(idToRemove);
                });
                await Promise.allSettled(removals);
              } else {
                localStorage.removeItem("guest_cart");
                window.dispatchEvent(new Event("guestCartChanged"));
              }
              localStorage.removeItem("user_cart");
              window.dispatchEvent(new Event("userCartChanged"));
              localStorage.removeItem("retryPaymentData"); // CLEAR ON SUCCESS
            } catch (err) {
              console.warn(
                "Error while clearing cart after online order:",
                err
              );
            }

            const elapsed = Date.now() - procStart;
            const minWait = 5000;
            if (elapsed < minWait) {
              await new Promise((res) => setTimeout(res, minWait - elapsed));
            }

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
            // Inner catch: Payment verified but order creation/cart clearing failed
            setProcessingPayment(false);
            console.error(err);

            // If it's a coupon min-order error, clear coupon locally and inform user
            const handled = handleCouponMinOrderError(err);
            if (!handled) {
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
                  cartItems,
                  couponCode: appliedCoupon?.code || couponCodeInput || "",
                })
              );
              setPaymentErrorMessage(
                `Payment failed post-verification: ${err.message || "Please try again."
                }`
              );
              setShowRetryOption(true); // Show retry button
              setShowPaymentModal(true);
            }
            // DO NOT REDIRECT TO /payment-failed
          }
        },

        modal: {
          ondismiss: () => {
            // User closed the Razorpay modal
            console.log("Razorpay modal dismissed");
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
                cartItems,
                couponCode: appliedCoupon?.code || couponCodeInput || "",
              })
            );
            setPaymentErrorMessage(
              "Payment cancelled by user. Please try again."
            );
            setShowRetryOption(true); // Show retry button
            setShowPaymentModal(true);
            // DO NOT REDIRECT TO /payment-failed
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      // Outer catch: Failed to create Razorpay order initially
      console.error(err);

      // If it's a coupon min-order error, clear coupon locally and inform user
      const handled = handleCouponMinOrderError(err);
      if (!handled) {
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
            cartItems,
            couponCode: appliedCoupon?.code || couponCodeInput || "",
          })
        );
        setPaymentErrorMessage(
          `Payment initiation failed: ${err.message || "Please try again."}`
        );
        setShowRetryOption(true); // Show retry button
        setShowPaymentModal(true);
      }

      // DO NOT REDIRECT TO /payment-failed
    } finally {
      setpaymentload(false);
      // setProcessingPayment(false); // This is handled within handler/catch blocks now
    }
  };
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
            <p className="text-gray-600">You saved ₹{couponDiscount?.toFixed(2) ?? "0.00"}</p>
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
      {/* Processing overlay (appears after successful payment until order work finishes) */}
      {processingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 w-[90%] max-w-sm">
            {/* simple spinner */}
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"></div>
            <h3 className="text-lg font-semibold">Processing your order</h3>
            <p className="text-sm text-gray-600 text-center">
              We’re finalizing your payment and preparing your order. This may
              take a few seconds.
            </p>
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
            {errors.contactInfo && (
              <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>
            )}
            <PhoneNumberField
              ref={phoneRef}
              mobileInfo={mobileInfo}
              setMobileInfo={setMobileInfo}
              errors={errors}
            />
          </div>

          {/* DELIVERY */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DELIVERY</h3>
            <label
              className={`flex items-center justify-between h-[52px] border rounded px-4 cursor-pointer ${deliveryOption === "ship"
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

            <label
              className={`flex items-center justify-between h-[52px] border rounded px-4 cursor-pointer ${deliveryOption === "COD"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
                }`}
              onClick={() => setDeliveryOption("COD")}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={deliveryOption === "COD"}
                  onChange={() => setDeliveryOption("cod")}
                />
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
                    {errors.shippingFirstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingFirstName}
                      </p>
                    )}
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
                    {errors.shippingLastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingLastName}
                      </p>
                    )}
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
                  {errors.shippingAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingAddress}
                    </p>
                  )}
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
                  {errors.shippingCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingCity}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  disabled
                  value={shippingCountry}
                  className="w-full h-[52px] border border-gray-300 rounded px-4"
                />
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
                  {errors.shippingState && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingState}
                    </p>
                  )}
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
                  {errors.shippingPinCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shippingPinCode}
                    </p>
                  )}
                </div>
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

          {/* ACTION */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full bg-black text-white h-[52px] rounded cursor-pointer"
              onClick={handlePayment}
            >
              {paymentload
                ? "Redirecting to payment page"
                : deliveryOption === "COD"
                  ? "Place Order (Cash on Delivery)"
                  : " Proceed to Pay"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:w-2/5 w-full bg-gray-100 p-6 lg:sticky top-0 lg:h-screen">
          <h5 className="text-xl font-semibold mb-4">Order Summary</h5>

          {/* ===== NEW: Coupon input area ===== */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Have a coupon?</label>
            {/* NOTE: made responsive - flex-wrap + min-w-0 on input to avoid overflow on 320px */}
            <div className="flex gap-2 flex-wrap">
              <input
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 min-w-0 h-[44px] px-3 rounded border border-gray-300"
              />
              {!appliedCoupon ? (
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponVerifying}
                  className="bg-indigo-600 text-white px-3 rounded flex-none h-[44px] min-w-[64px]"
                >
                  {couponVerifying ? "Checking..." : "Apply"}
                </button>
              ) : (
                <button
                  onClick={handleRemoveCoupon}
                  className="bg-red-600 text-white px-3 rounded flex-none h-[44px] min-w-[64px]"
                >
                  Remove
                </button>
              )}
            </div>

            {/* ===== NEW: Available coupons list (click to auto-apply) ===== */}
            <div className="mt-3">
              {availableLoading ? (
                <div className="text-sm text-gray-500">Loading coupons...</div>
              ) : availableError ? (
                <div className="text-sm text-red-500">{availableError}</div>
              ) : availableCoupons && availableCoupons.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {availableCoupons.map((c) => (
                    <button
                      key={c._id || c.code}
                      onClick={() => applyAvailableCoupon(c)}
                      className="flex items-center justify-between px-3 py-2 rounded border border-gray-200 bg-white hover:bg-gray-50 text-left w-full"
                      title={`Apply ${c.code}`}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{c.name || c.code}</span>
                        <span className="text-xs text-gray-500 truncate">
                          {c.percentage?.toString ? `${c.percentage}% off` : ""}
                          {c.minOrderAmount ? ` • Min ₹${c.minOrderAmount}` : ""}
                          {c.maxDiscountAmount ? ` • Max ₹${c.maxDiscountAmount}` : ""}
                        </span>
                      </div>
                      <div className="text-sm text-indigo-600 font-medium ml-3">
                        Apply
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No coupons available</div>
              )}
            </div>
            {/* ================================= */}

            {appliedCoupon && (
              <div className="mt-2 text-sm text-green-700">
                Applied: <strong>{appliedCoupon.name || appliedCoupon.code}</strong>{" "}
                — {appliedCoupon.percentage}% off
                {appliedCoupon.maxDiscountAmount ? ` (max ₹${appliedCoupon.maxDiscountAmount})` : ""}
              </div>
            )}
          </div>
          {/* ================================= */}

          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2 cart-items-wrapper">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex justify-between items-center gap-4 border-b pb-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={
                        item.product?.images?.[0] ||
                        item.product?.image ||
                        item.image
                      }
                      alt={item.product?.name || item.name}
                      className="w-[100px] h-[100px] rounded object-cover"
                    />
                    <div>
                      <h3 className="text-base font-semibold">
                        {item.product?.name || item.title?.en || item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ₹{item.price?.toFixed(2)}
                      </p>
                      {/** Display cuttingType in summary if present */}
                      {(
                        item.cuttingType ||
                        item.selectedCuttingType ||
                        item.cutting ||
                        item.cut
                      ) && (
                          <p className="text-sm text-gray-400 mt-1">
                            Cutting:{" "}
                            {item.cuttingType ||
                              item.selectedCuttingType ||
                              item.cutting ||
                              item.cut}
                          </p>
                        )}
                    </div>
                  </div>
                  {/* optionally add remove button */}
                </div>
              ))
            )}
          </div>

          {/* Show discount breakdown */}
          <div className="mt-4 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹ {total?.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">- ₹ {couponDiscount?.toFixed(2) ?? "0.00"}</span>
            </div>

            <div className="flex justify-between mt-2">
              <h6 className="text-lg font-bold">Payable</h6>
              <span className="text-lg font-medium">
                ₹ {(Math.max(0, (total || 0) - (couponDiscount || 0))).toFixed(2)}
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              <strong>Payment:</strong>{" "}
              {deliveryOption === "COD" ? "Cash on Delivery" : "Online Payment"}
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
                  setMapUrl(
                    `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`
                  );
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

      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 text-center">
            {/* Lottie Animation */}
            <div className="w-full h-50 mx-auto mb-4 -mt-5">
              <Lottie animationData={failAnimation} loop={false} autoplay />
            </div>

            {/* Error Message */}
            {paymentErrorMessage && (
              <p className="text-red-600 text-lg font-medium mb-4">
                {paymentErrorMessage}
              </p>
            )}

            {/* Retry Button */}
            {showRetryOption && (
              <button
                onClick={handlePayment}
                className="bg-red-600 text-white cursor-pointer px-6 py-3 rounded hover:bg-red-700 transition mb-4"
              >
                Retry Payment
              </button>
            )}

            {/* Countdown Timer */}
            <p className="text-gray-500 text-sm">
              Closing in <span className="font-bold">{countdown}</span> seconds
              or{" "}
              <p
                className="text-green-600 cursor-pointer underline mt-2"
                onClick={() => {
                  setShowPaymentModal(false);
                  setCountdown(0);
                }}
              >
                Close Now
              </p>
            </p>
          </div>
        </div>
      )}
      {showCODConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-[90%]">
            <h2 className="text-lg font-bold mb-2 pb-2 border-b border-gray-200">
              Confirm Cash on Delivery
            </h2>
            <p className="text-gray-600 my-4">
              Are you sure you want to place this order with{" "}
              <b>Cash on Delivery</b>?
            </p>
            <div className="flex justify-center gap-4 mt-5">
              <button
                className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => setShowCODConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-800"
                onClick={confirmCODOrder}
              >
                Yes, Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <MobileFooter />
    </>
  );
}

export default PaymentPage;
