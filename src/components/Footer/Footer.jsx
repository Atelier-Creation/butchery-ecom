import React from "react";
import "./Footer.css";
import { FaGem, FaInstagram } from "react-icons/fa";
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";
function Footer() {
  return (
    <footer
      className="footer"
      itemType="https://schema.org/WPFooter"
      itemScope
      role="contentinfo"
    >
      <div className="footer-container">
        {/* Logo & Contact Info */}
        <div className="footer-top">
          <div className="footer-logo">
            <a href="https://demo2.wpopal.com/meatlers">
              <img
                src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/logo-white.svg"
                alt="Meatlers Logo"
              />
            </a>
          </div>
          <div className="footer-contact">
            <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
          </div>
          <div className="footer-contact">
            <p>
              support@example.com
              <br />
              <strong className="primary-color">+(084) 456-0789</strong>
            </p>
          </div>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/opalwordpress"
              target="_blank"
              rel="noreferrer"
            >
              {/* Facebook SVG */}
              <svg viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/opalwordpress"
              target="_blank"
              rel="noreferrer"
            >
              {/* X Twitter SVG */}
              <svg viewBox="0 0 512 512">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>
            </a>
            <a
              href="https://vn.linkedin.com/company/wpopal"
              target="_blank"
              rel="noreferrer"
            >
              {/* LinkedIn SVG */}
              <svg viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/user/WPOpalTheme"
              target="_blank"
              rel="noreferrer"
            >
              {/* Instagram SVG */}
              <FaInstagram className="footer-icon" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h6>Shop</h6>
            <ul>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/beef-steak/">
                  Beef
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/sausage/">
                  Sausage
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/pork-ribs/">
                  Pork
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/seafood/">
                  Veal
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/chicken-legs/">
                  Chicken
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/product-category/quail-wings/">
                  Lamb
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h6>Quick Links</h6>
            <ul>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/about-us/">About</a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/blog/">Press</a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/pricing-plans/">
                  Recipes
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/testimonials/">
                  Reviews
                </a>
              </li>
              <li>
                <FaGem className="footer-icon" />
                <a href="https://demo2.wpopal.com/meatlers/contact/">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h6>Newsletter</h6>
            <p>
              Sign up for exclusive offers, original stories, events and more.
            </p>
            <form className="footer-newsletter icons-chages">
              <input type="email" placeholder="Email address*" required />
              <button type="submit">
                Subscribe
                <span className="footer-btn-icon">
                  <LuArrowUpRight className="icon upright" />
                  <LuArrowRight className="icon right" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
      </div>
      <div className="footer-bottom z-10">
        <p>
          © Copyright 2024{" "}
          <a
            href="https://demo2.wpopal.com/meatlers/"
            className="primary-color"
          >
            Meatlers
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
