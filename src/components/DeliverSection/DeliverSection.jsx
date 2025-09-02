import React from 'react'
import './DeliverSection.css'
// Bootstrap Icons
import { BsThermometerHalf, BsShieldCheck, BsArrowRight } from "react-icons/bs";
// FontAwesome fallback
import { FaVirus } from "react-icons/fa";
function DeliverSection() {
  return (
    <div className="deliver-container">
      <div className="deliver-inner">
        {/* Section Headings */}
        <div className="deliver-heading-small">What We Deliver</div>
        <h2 className="deliver-heading-main">
          quality control and production
        </h2>

        {/* Icon Boxes */}
        <div className="deliver-icons">
          <div className="deliver-icon-box">
            <span className="deliver-icon">
            <BsThermometerHalf />
            </span>
            <h6 className="deliver-icon-title">Temperature Control</h6>
          </div>

          <div className="deliver-icon-box">
            <span className="deliver-icon">
            <BsShieldCheck />
            </span>
            <h6 className="deliver-icon-title">quality safety check</h6>
          </div>

          <div className="deliver-icon-box">
            <span className="deliver-icon">
            <FaVirus />
            </span>
            <h6 className="deliver-icon-title">Antibacterial Treatment</h6>
          </div>
        </div>

        {/* Paragraph */}
        <p className="deliver-description">
          Sourcing the finest meats and poultry from around the corner to around
          the world. You won’t find them at your local supermarket. Naturally
          and humanely raised meats and poultry, antibiotic and hormone free,
          tasting the way nature intended.
        </p>

        {/* Button */}
        <div className="deliver-btn-wrap">
          <a
            className="deliver-btn"
            href="https://demo2.wpopal.com/meatlers/about-us/"
          >
            <span className="deliver-btn-icon">
              <i className="meatlers-icon- meatlers-icon-right-arrow"></i>
            </span>
            <span className="deliver-btn-text">discover now</span>
          </a>
        </div>
      </div>

      {/* Right Side Banner */}
      <div className="deliver-banner">
        <div
          className="deliver-banner-bg"
          style={{
            backgroundImage:
              "url(https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img5.jpg)",
          }}
        >
          <div className="deliver-banner-overlay"></div>
          <div className="deliver-banner-content">
            <h1 className="deliver-banner-title">FRESH &amp; QUALITY MEAT</h1>
            <div className="deliver-banner-desc">
              Every Meatlers product is 3rd-party animal welfare certified.
            </div>
          </div>
        </div>
                            {/* Decorative Image */}
                            <div className="deliver-banner-img">
          <img
            src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_vector1.png"
            alt="vector"
          />
        </div>
      </div>
              {/* Floating Image */}
              <div className="deliver-image">
          <img
            src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img4.png"
            alt="quality meat"
          />
        </div>
    </div>
  )
}

export default DeliverSection
