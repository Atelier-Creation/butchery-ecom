import "./ProfilePageSidebar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

function ProfilePageSidebar({ setActiveSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (section) =>
    section === activeSection
      ? "profile-page-sidebar-icon-text active"
      : "profile-page-sidebar-icon-text";

  const [profiledata, setProfileData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    localStorage.getItem("user") &&
      console.log(localStorage.getItem("authUser"));
    setProfileData(JSON.parse(localStorage.getItem("user")));
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user_cart");
    setShowLogoutModal(true); // show modal instead of alert
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
    navigate("/"); // redirect after modal closes
  };

  return (
    <div className="profile-page-sidebar-con">
      {/* Mobile menu toggle button */}
      <div
        className="mobile-menu-toggle ms-2 bg-gray-200 rounded-sm"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <EllipsisVertical />
      </div>

      {/* Sidebar items for mobile */}
      {menuOpen && (
        <div className="mobile-sidebar-menu">
          <div
            className={isActive("personal")}
            onClick={() => {
              setActiveSection("personal");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-person"></i>
            <h5>Account Overview</h5>
          </div>

          <div
            className={isActive("orders")}
            onClick={() => {
              setActiveSection("orders");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-journal-text"></i>
            <h5>My Orders</h5>
          </div>

          <div
            className={isActive("address")}
            onClick={() => {
              setActiveSection("address");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-geo-alt"></i>
            <h5>Saved Addresses</h5>
          </div>

          <div
            className={isActive("wishlist")}
            onClick={() => {
              setActiveSection("wishlist");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-heart"></i>
            <h5>My Wishlist</h5>
          </div>

          <div
            className={isActive("help")}
            onClick={() => {
              setActiveSection("help");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-patch-question"></i>
            <h5>Need Help</h5>
          </div>

          <div onClick={handleSignOut} style={{ cursor: "pointer" }}>
            <div className="profile-page-sidebar-icon-text">
              <i className="bi bi-box-arrow-in-left"></i>
              <h5>Log Out</h5>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("personal")}
            onClick={() => {
              setActiveSection("personal");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-person"></i>
            <h5>Account Overview</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("orders")}
            onClick={() => {
              setActiveSection("orders");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-journal-text"></i>
            <h5>My Orders</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("address")}
            onClick={() => {
              setActiveSection("address");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-geo-alt"></i>
            <h5>Saved Addresses</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("wishlist")}
            onClick={() => {
              setActiveSection("wishlist");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-heart"></i>
            <h5>My Wishlist</h5>
          </div>
        </div>

        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("help")}
            onClick={() => {
              setActiveSection("help");
              setMenuOpen(false);
            }}
          >
            <i className="bi bi-patch-question"></i>
            <h5>Need Help</h5>
          </div>
        </div>

        <div
          className="profile-page-sidebar-individual-sec"
          onClick={handleSignOut}
          style={{ cursor: "pointer" }}
        >
          <div className="profile-page-sidebar-icon-text">
            <i className="bi bi-box-arrow-in-left"></i>
            <h5>Log Out</h5>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-1000">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">Signed Out</h2>
            <p className="text-gray-600 mt-2">
              You have been logged out successfully.
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePageSidebar;
