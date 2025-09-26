import React, { useEffect, useState } from "react";
import ProfilePageSidebar from "./ProfilePageSidebar/ProfilePageSidebar";
import ProfilePageInfo from "./ProfilePageInfo/ProfilePageInfo";
import "./ProfilePage.css";
import ProductPageAddress from "./ProductPageAddress/ProductPageAddress";
import Wishlist from "./Wishlist/Wishlist";
import { useLocation, useNavigate } from "react-router-dom";
import CartPageProfile from "./CartPageProfile/CartPageProfile";
import MyOrders from "./MyOrders/MyOrders";
import Navbar from "../../pages/MobileDesign/Navbar";
import MobileNavbar from "../../pages/MobileDesign/MobileNavbar";
import MobileFooter from "../../pages/MobileDesign/MobileFooter";
import IconMenu from "../../pages/MobileDesign/MobileIconMenu";

const menuItems = [
  { label: "Chicken", link: "/collections/chicken", icon: "//lenaturelmeat.com/cdn/shop/files/turkey-chicken-svgrepo-com_32x32.svg?v=1752237020" },
  { label: "Mutton", link: "/collections/mutton", icon: "//lenaturelmeat.com/cdn/shop/files/meat-cut-svgrepo-com_1_32x32.svg?v=1752237274" },
  { label: "Egg", link: "/collections/eggs", icon: "//lenaturelmeat.com/cdn/shop/files/eggs-in-basket-svgrepo-com_32x32.svg?v=1752237467" },
  { label: "Fish", link: "/collections/fish", icon: "//lenaturelmeat.com/cdn/shop/files/fish-svgrepo-com_32x32.svg?v=1753957578" },
];

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");
  const storedUser = localStorage.getItem("user"); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ redirect if no token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />

      <div className="categories-page-container"></div>
      <div className="profile-page-wrapper">
        <ProfilePageSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="profile-page-right-section">
          {activeSection === "personal" && (
            <ProfilePageInfo user={storedUser ? JSON.parse(storedUser) : null} />
          )}
          {activeSection === "address" && <ProductPageAddress />}
          {activeSection === "cart" && <CartPageProfile />}
          {activeSection === "wishlist" && <Wishlist />}
          {activeSection === "orders" && <MyOrders />}
          {activeSection === "help" && (
            <div>
              <h1>Help Section</h1>
            </div>
          )}
        </div>
      </div>
      <MobileFooter />
    </>
  );
}

export default ProfilePage;
