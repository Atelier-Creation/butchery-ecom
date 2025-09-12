import "./ProfilePageSidebar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";

function ProfilePageSidebar({ setActiveSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (section) =>
    section === activeSection
      ? "profile-page-sidebar-icon-text active"
      : "profile-page-sidebar-icon-text";
  const [profiledata, setProfileData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    localStorage.getItem("authUser") &&
      console.log(localStorage.getItem("authUser"));
    setProfileData(JSON.parse(localStorage.getItem("authUser")));
  }, [setProfileData]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authUser"); // or clear all: localStorage.clear();
    localStorage.removeItem("authToken");
    clearWishlist(); // clear wishlist
    clearCart(); // Clear cart items
    alert("Signed out successfully"); // Optional
    navigate("/"); // Redirect to login page or home
  };

  return (
    <div className="profile-page-sidebar-con">
      {/* Mobile menu toggle button */}
      <div
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i
          className="bi bi-list"
          style={{ fontSize: "24px", cursor: "pointer" }}
        ></i>
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
      {/* <div className="profile-page-sidebar-image">
  <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
    {profiledata?.profileUrl ? (
      <img
        src={profiledata.profileUrl || profileImage}
        alt="Profile"
        style={{ width: 100, height: 100, borderRadius: "10px" }}
      />
    ) : (
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "10px",
          backgroundColor: getBackgroundColor(profiledata?.name),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          fontWeight: "bold",
          color: "#888",
        }}
      >
        {profiledata?.name?.[0]?.toUpperCase() || "U"}
      </div>
    )}
  </label>

  <input
    type="file"
    id="profile-upload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageChange}
  />

  <h4>{profiledata?.name}</h4>
  <p>{profiledata?.email || profiledata?.phone}</p>
</div> */}
      <div className="desktop-sidebar">
        <div className="profile-page-sidebar-individual-sec">
          <div
            className={isActive("personal")}
            onClick={() => {
              setActiveSection("personal");
              setMenuOpen(false);
            }}
          >
            <i class="bi bi-person"></i>
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
            <i class="bi bi-journal-text"></i>
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
            <i class="bi bi-geo-alt"></i>
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
          <div>
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
        <div className="profile-page-sidebar-individual-sec">
          <div>
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
    </div>
  );
}

export default ProfilePageSidebar;
