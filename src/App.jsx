import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MobileDesign from "./pages/MobileDesign/MobileDesign";
import Collections from "./pages/Collections/Collections";
import PDPsec1 from "./pages/ProductDetailsPage/PDPsec1";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { CartProvider } from "./components/CartDrawer/CartContext";

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
      <Routes>
        {/* <Route
          path="/*"
          element={isMobile ? <MobileDesign /> : <HomePage />}
        /> */}
        <Route
          path="/"
          element={<MobileDesign/>}
        />
        <Route
          path="/collections/*"
          element={<Collections/>}
        />
        <Route
          path="/products/*"
          element={<PDPsec1/>}
        />
        <Route
          path="/profile"
          element={<ProfilePage/>}
        />
      </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
