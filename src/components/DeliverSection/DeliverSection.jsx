import React, { useEffect, useRef } from "react";
import "./DeliverSection.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";
// Bootstrap Icons
import { BsThermometerHalf, BsShieldCheck, BsArrowRight } from "react-icons/bs";
// FontAwesome fallback
import { FaVirus } from "react-icons/fa";
function DeliverSection() {
  const imageref = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    gsap.fromTo(
      imageref.current,
      { x: 0 },
      {
        y: -130,
        duration: 10,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageref.current,
          start: "top 50%",
          end: " top 60%",
          scrub: 2,
          markers: false,
        },
      }
    );
  }, []);
  return (
    <div className="deliver-container">
      <div className="deliver-inner">
        {/* Section Headings */}
        <div className="deliver-heading-small">What We Deliver</div>
        <h2 className="deliver-heading-main">quality control and production</h2>

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
          <a className="deliver-btn icons-chages" href="#">
            discover now
            <span className="footer-btn-icon">
              <LuArrowUpRight className="icon upright" />
              <LuArrowRight className="icon right" />
            </span>
          </a>
        </div>
      </div>

      {/* Right Side Banner */}
      <div className="deliver-banner">
        <div
          className="deliver-banner-bg"
          style={{
            backgroundImage:
              "url(https://godavaricuts.com/cdn/shop/products/Godavari-Cuts-Day-1-_51-of-65.jpg)",
          }}
        >
          {/* <div className="deliver-banner-overlay"></div> */}
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
      <div className="deliver-image" ref={imageref}>
        <img
          src="./country-chicken-full-laying.png"
          alt="quality meat"
        />
      </div>
    </div>
  );
}

export default DeliverSection;
