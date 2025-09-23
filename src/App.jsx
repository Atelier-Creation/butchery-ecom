import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              <Route path="/products/:id" element={<PDPsec1 />} />
              <Route path="/checkout" element={<PaymentPage />} />
              <Route
                path="/order-confirmed"
                element={<OrderConfirmed />}
              ></Route>
              <Route path="/payment-failed" element={<OrderConfirmed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/view-cart" element={<ShoppingCart />}></Route>
              <Route path="/forgot-password" element={<ResetPassword />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </ModalQuickProvider>
        </ModalProvider>
      </CartProvider>
      <WhatsAppFloatButton />
    </Router>
  );
}

export default App;

