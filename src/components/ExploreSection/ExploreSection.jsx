import React from "react";
import './ExploreSection.css'
function ExploreSection() {
  return (
    <div className="about-container">
      <div className="about-left">
        {/* Main Image */}
        <div className="main-image">
        <img
          className="about-main-img"
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img6.png"
          alt="about"
        />
</div>
        {/* Rotated Background Heading */}
        <h2 className="about-rotated-text">
          About meat <br />
          About meat <br />
          About meat <br />
          About meat <br />
          About meat <br />
          About meat
        </h2>

        {/* Floating Vector */}

        {/* <img
          className="about-floating-vector"
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/ab-vector2.png"
          alt="vector"
        /> */}
      </div>

      <div className="about-right">
        {/* Floating Small Vector */}
        <img
          className="about-right-vector"
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/ab-vector3.png"
          alt="vector"
        />

        <p className="about-subtitle">Explore Now</p>
        <h2 className="about-title">The Premier Meat Provider</h2>
        <p className="about-desc">
          Online Butchers source the finest beef, pork and lamb breeds from the
          British Isles. Our meat is bred to perfection to yield more marbling
          and fuller flavour. Our mission as an online butcher is to provide
          better meat sourced sustainably in the UK.
        </p>

        {/* Counters */}
        <div className="about-counters">
          <div className="counter">

            <h3 className="counter-value">180K+</h3>
            <p className="counter-title">Types of meat products</p>
          </div>
          <div className="counter">

            <h3 className="counter-value">380K+</h3>
            <p className="counter-title">Projects completed in 30 years</p>
          </div>
        </div>

        {/* Button */}
        <a
          href="https://demo2.wpopal.com/meatlers/shop/"
          className="about-btn"
        >
          SHOP ONLINE →
        </a>
      </div>
    </div>
  );
}

export default ExploreSection;
