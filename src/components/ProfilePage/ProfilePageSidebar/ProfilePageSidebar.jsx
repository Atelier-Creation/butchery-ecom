import "./ProfilePageSidebar.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical, Check } from "lucide-react";

function ProfilePageSidebar({ setActiveSection, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const timerRef = useRef(null);

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
    const u = localStorage.getItem("user");
    if (u) {
      try {
        setProfileData(JSON.parse(u));
      } catch (err) {
        console.warn("Failed parsing stored user:", err);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
     setMenuOpen(false);
    // remove stored data immediately
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user_cart");

    // show attractive modal and auto-close after 2s
    setShowLogoutModal(true);
  };

  // When showLogoutModal toggles on, start a 2s timer to hide + navigate.
  useEffect(() => {
    if (showLogoutModal) {
      // clear any previous timer just in case
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setShowLogoutModal(false);
        navigate("/"); // redirect after modal closes
        timerRef.current = null;
      }, 2000); // 2000ms = 2 seconds
    }

    return () => {
      // cleanup on unmount or when showLogoutModal changes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showLogoutModal, navigate]);

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
              <i className="bi bi-box-arrow-in-left"></i>
              <h5>Log Out</h5>
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

        {/* <div className="profile-page-sidebar-individual-sec">
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
        </div> */}

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

      {/* Attractive auto-closing Logout Modal (no OK button) */}
      {showLogoutModal && (
  <div
    className="bright-logout-root fixed inset-0 flex items-center justify-center z-50"
    aria-live="polite"
    role="status"
    aria-label="Logged out notification"
  >
    {/* backdrop */}
    <div className="bright-logout-backdrop" />

    {/* card */}
    <div className="bright-logout-card" role="dialog" aria-modal="true">
      <div className="bright-top">
        <div className="bright-badge" aria-hidden="true">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.06)" />
            <path
              d="M20 6L9 17l-5-5"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="bright-body">
        <h3 className="bright-title">Signed out</h3>
        <p className="bright-desc">
          You have been logged out successfully. Redirecting to home
          <span className="bright-dots" aria-hidden="true"> • • •</span>
        </p>
      </div>
    </div>

    {/* local styles */}
    <style>
      {`
      :root { --accent1: #FF5F6D; --accent2: #FF9966; --accent3: #FFD166; }

      .bright-logout-root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

      /* backdrop */
      .bright-logout-backdrop {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 10% 10%, rgba(255,95,109,0.06), transparent 18%),
                    radial-gradient(circle at 90% 90%, rgba(255,217,102,0.04), transparent 22%),
                    rgba(4,6,12,0.62);
        backdrop-filter: blur(6px) saturate(1.12);
      }

      /* card */
      .bright-logout-card {
        position: relative;
        z-index: 12;
        width: 380px;
        max-width: calc(100% - 36px);
        background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        border-radius: 16px;
        padding: 18px;
        display: flex;
        align-items: center;
        gap: 14px;
        box-shadow: 0 18px 40px rgba(20,28,40,0.6), 0 4px 18px rgba(255,149,97,0.06);
        border: 1px solid rgba(255,255,255,0.04);
        animation: brightPop 260ms cubic-bezier(.2,.95,.2,1);
      }

      @keyframes brightPop {
        from { opacity: 0; transform: translateY(-12px) scale(.98); filter: blur(2px); }
        to { opacity: 1; transform: translateY(0) scale(1); filter: none; }
      }

      /* top area */
      .bright-top { display:flex; flex-direction: column; align-items:center; gap:12px; margin-right:4px; }

      .bright-badge {
        width: 74px;
        height: 74px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, var(--accent1), var(--accent2));
        box-shadow:
          0 10px 28px rgba(255,121,97,0.18),
          0 0 30px rgba(255,153,102,0.12),
          inset 0 -6px 18px rgba(255,255,255,0.06);
        border: 2px solid rgba(255,255,255,0.08);
      }

      /* body text */
      .bright-body { flex:1; padding-left: 8px; }
      .bright-title {
        margin: 0;
        font-size: 19px;
        font-weight: 700;
        color: white;
        text-shadow: 0 6px 18px rgba(0,0,0,0.45);
        letter-spacing: 0.2px;
      }
      .bright-desc {
        margin: 6px 0 0;
        font-size: 13px;
        color: rgba(255,255,255,0.92);
        opacity: 0.95;
      }
      .bright-dots {
        margin-left:8px;
        color: rgba(255,255,255,0.9);
        animation: dotsBright 2s steps(3,end) infinite;
      }

      @keyframes dotsBright {
        0% { content: '•' }
        33% { content: '• •' }
        66% { content: '• • •' }
        100% { content: '•' }
      }

      /* responsive */
      @media (max-width: 420px) {
        .bright-logout-card { width: calc(100% - 28px); padding: 14px; gap: 10px; }
        .bright-badge { width: 60px; height: 60px; transform: translateY(-14px); }
        .bright-title { font-size: 17px; }
      }
    `}
    </style>
  </div>
)}



      {/* small keyframe styles injected here to keep component self-contained */}
      <style>
        {`
          @keyframes popupFade {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes progressBar {
            from { transform: translateX(-100%); width: 0%; }
            to { transform: translateX(0%); width: 100%; }
          }
        `}
      </style>
    </div>
  );
}

export default ProfilePageSidebar;
