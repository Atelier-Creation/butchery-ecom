import React from 'react'
import './Banner.css'
function Banner() {
  return (
    <div className="banner-section">
      {/* First Banner */}
      <div className="banner-card">
        <a href="https://demo2.wpopal.com/meatlers/shop/">
          <div
            className="banner-bg"
            style={{
              backgroundImage:
                "url(https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img2.jpg)",
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h2 className="banner-title">Family Favorites Package</h2>
              <div>
              <p className="banner-desc">
                This Package Contains all your favorites!
              </p>
              </div>
              <p className="banner-price">$199.9</p>
              <button className="banner-btn">
                Shop Now <i className="meatlers-icon-right-arrow"></i>
              </button>
            </div>
          </div>
        </a>
      </div>

      {/* Second Banner */}
      <div className="banner-card">
        <a href="https://demo2.wpopal.com/meatlers/shop/">
          <div
            className="banner-bg"
            style={{
              backgroundImage:
                "url(https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img7.jpg)",
            }}
          >
            <div className="banner-overlay"></div>
            <div className="banner-content right">
              <h2 className="banner-title">Fresh beef steak with pepper</h2>
              <div>
              <p className="banner-desc right">
                Build your own meat box and get up to 25% discount
              </p>
              </div>
              <p className="banner-price">$179.9</p>
              <button className="banner-btn">
                Shop Now <i className="meatlers-icon-right-arrow"></i>
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Banner
