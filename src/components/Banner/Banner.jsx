import React from "react";
import "./Banner.css";
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";
function Banner() {
  return (
    <div className="banner-section">
      {/* First Banner */}
      <div className="banner-card">
        <a href="#">
          <div
            className="banner-bg"
            style={{
              backgroundImage: "url(./Country-chicken-Legs.png)",
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h2 className="banner-title">Country chicken Legs</h2>
              <div>
                <p className="banner-desc">Best For Chettinadu Dishes!</p>
              </div>
              <p className="banner-price">₹199.9 (500gm)</p>
              <button className="banner-btn left icons-chages">
                Shop Now{" "}
                <span className="footer-btn-icon">
                  <LuArrowUpRight className="icon upright" />
                  <LuArrowRight className="icon right" />
                </span>
              </button>
            </div>
          </div>
        </a>
      </div>

      {/* Second Banner */}
      <div className="banner-card">
        <a href="#">
          <div
            className="banner-bg"
            style={{
              backgroundImage: "url(./Grill-Chicken-Full.jpg)",
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content right">
              <h2 className="banner-title">Fresh Full Skin Chicken for(Grill) </h2>
              <div>
                <p className="banner-desc right">
                  Get your Chicken on your desiered way!
                </p>
              </div>
              <p className="banner-price">₹ 279 ~(800gm)</p>
              <button className="banner-btn icons-chages">
                Shop Now{" "}
                <span className="footer-btn-icon">
                  <LuArrowUpRight className="icon upright" />
                  <LuArrowRight className="icon right" />
                </span>
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Banner;
