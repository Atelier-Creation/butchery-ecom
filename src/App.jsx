import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MobileDesign from "./pages/MobileDesign/MobileDesign";
import Collections from "./pages/Collections/Collections";
import PDPsec1 from "./pages/ProductDetailsPage/PDPsec1";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { CartProvider } from "./components/CartDrawer/CartContext";
import Login from "./pages/LoginPage/Login";
import ResetPassword from "./pages/LoginPage/ResetPassword";
import CreateAccount from "./pages/LoginPage/CreateAccount";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import { ModalProvider } from "./context/GlobalModal";
import { ModalQuickProvider } from "./context/QuickContext";
import "./App.css";
import ScrollToTop from "./context/ScrollToTop";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";
import PaymentPage from "./pages/MobileDesign/PaymentPage";
import OrderConfirmed from "./pages/MobileDesign/OrderConfirmed";
import ShoppingCart from "./pages/MobileDesign/ShoppingCart";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsContion from "./components/Terms-Contion";
import usePushNotifications from "./hooks/usePushNotifications";
import usePWAInstallPrompt from "./hooks/usePWAInstallPrompt";
function App() {
  const { isInstallable, installApp } = usePWAInstallPrompt();
  usePushNotifications();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const RedirectIfLoggedIn = () => {
    const token = localStorage.getItem("token"); // or your auth check
    if (token) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const notificationId = urlParams.get("notificationId");

    if (notificationId) {
      fetch(`${API_URL}/notifications/track/${notificationId}`, {
        method: "POST",
      });
    }
  }, []);
 useEffect(() => {
  console.log("useEffect: isInstallable =", isInstallable);

  if (isInstallable) {
    // Check if we are NOT in standalone mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    console.log("isStandalone:", isStandalone);

    if (!isStandalone) {
      const timer = setTimeout(() => {
        console.log("Timeout triggered, window.innerWidth:", window.innerWidth);

        // Only show on mobile (less than 1024px)
        if (window.innerWidth < 1024) {
          const popup = document.getElementById("pwa-install-popup");
          console.log("Popup element found:", popup);
          if (popup) popup.style.display = "block";
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
        console.log("Timeout cleared");
      };
    } else {
      console.log("Standalone mode detected, not showing popup");
    }
  }
}, [isInstallable]);


  return (
    <Router>
      <CartProvider>
        <ModalProvider>
          <ModalQuickProvider>
            <ScrollToTop />
            <Routes>
              {/* <Route
          path="/*"
          element={isMobile ? <MobileDesign /> : <HomePage />}
        /> */}
              <Route path="/" element={<MobileDesign />} />
              <Route path="/collections/:id" element={<Collections />} />
              <Route path="/collections/All" element={<Collections />} />
              <Route path="/products/:id" element={<PDPsec1 />} />
              <Route path="/checkout" element={<PaymentPage />} />
              <Route path="/terms-conditions" element={<TermsContion />} />
              <Route
                path="/order-confirmed"
                element={<OrderConfirmed />}
              ></Route>
              <Route path="/payment-failed" element={<OrderConfirmed />} />
              <Route element={<RedirectIfLoggedIn />}>
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ResetPassword />} />
              </Route>
              <Route path="/view-cart" element={<ShoppingCart />}></Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </ModalQuickProvider>
        </ModalProvider>
      </CartProvider>
      <WhatsAppFloatButton />
      <div
        id="pwa-install-popup"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-xl p-4 rounded-2xl border border-gray-300 w-[90%] max-w-[380px] z-50 hidden"
      >
        <div className="flex gap-3 items-center">
          <div className="bg-gray-100 rounded-sm border border-gray-200 p-2 aspect-square h-20 flex items-center justify-center">
            <img src="/logo.svg" alt="logo" className="aspect-square h-20" />
          </div>
          <div>
            <h3 className="text-md font-semibold">Install Iraichi Kadai App</h3>
            <p className="text-xs text-gray-500 mt-2">
              Add Iraichi Kadai to your home screen for faster access.
            </p>
          </div>
        </div>

        <button
          onClick={installApp}
          className="mt-4 w-full bg-red-700 text-white py-2 rounded-full font-medium"
        >
          Install Now
        </button>

        <button
          onClick={() => {
            document.getElementById("pwa-install-popup").style.display = "none";
          }}
          className="mt-2 w-full text-gray-600 text-sm"
        >
          Maybe Later
        </button>
      </div>
    </Router>
  );
}

export default App;
