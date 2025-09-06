import React from "react";
import "./FindStore.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";
const images = [
  "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/gallrery-2.jpg",
  "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/gallrery-3.jpg",
  "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/gallrery-4.jpg",
  "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/gallrery-5.jpg",
  "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/gallrery-6.jpg",
];
function FindStore() {
  return (
    <>
      <div className="findStore-container">
        <div className="find-store-inner">
          <img src="/ik-logo-black.svg" alt="logo" className="w-80 rounded-md bg-white p-3" />

          <div className="find-store-heading">
            <h1>100% money back guarantee</h1>
          </div>
          <div className="icons-chages">
            <button className="find-store-btn">
              FIND LOCAL STORE
              <span className="footer-btn-icon">
                <LuArrowUpRight className="icon upright" />
                <LuArrowRight className="icon right" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="images-data-div">
        {images.map((image, index) => (
          <div key={index} className="images-item-div">
            <img src={image} />
            <FaPlus className="fa-plus-icon" />
          </div>
        ))}
      </div>
    </>
  );
}

export default FindStore;
