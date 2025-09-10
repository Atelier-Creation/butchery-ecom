import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MobileDesign from "./pages/MobileDesign/MobileDesign";
import Collections from "./pages/Collections/Collections";

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
      </Routes>
    </Router>
  );
}

export default App;
