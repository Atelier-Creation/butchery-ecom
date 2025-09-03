import React from 'react'
import './QualitySection.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const products = [
    {
      id: 102,
      name: "Sirloin Steaks",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_24-300x300.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 100,
      name: "Hand cut Beef Fillet Steaks",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_23-300x300.jpg",
      price: 353.73,
      oldPrice: 178.43,
      sale: null,
      link: "https://demo2.wpopal.com/meatlers/shop/hand-cut-beef-fillet-steaks/",
      inStock: true,
    },
    {
      id: 98,
      name: "Beef Short Ribs",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_22-300x300.jpg",
      price: 360.95,
      oldPrice: 444.01,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/beef-short-ribs/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
    {
      id: 96,
      name: "Bone-in Ribeye Steak",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/product_21-300x300.jpg",
      price: 994.83,
      oldPrice: 178.43,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/bone-in-ribeye-steak/",
      inStock: true,
    },
  ];
function QualitySection() {
  return (
    <div className="products-section">
      {/* Heading */}
      <div className="products-heading">
        <p className="subtitle">Quality Meats</p>
        <h2 className="title">Affordable meat products</h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={6}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              if (index < 5) {
                return `<span class="${className}"></span>`;
              }
              return ''; // hide bullets after 5
            },
          }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 6},
        }}
      >
      {/* Products Grid */}
      <ul className="products-grid">
        
        {products.map((product) => (
        <SwiperSlide key={product.id}>
          <li
            key={product.id}
            className={`product-card ${product.inStock ? "instock" : "outofstock"}`}
          >
  <div className="product-actions">
    {/* Cart icon (always visible) */}
    <button className="cart-btn">
      <i className="bi bi-basket2"></i>
    </button>

    {/* Hover icons (appear above cart on hover) */}
    <div className="hover-icons">
      <button><i className="bi bi-eye"></i></button>
      <button><i className="bi bi-repeat"></i></button>
      <button><i className="bi bi-suit-heart"></i></button>
    </div>
  </div>

            <div className="product-image-wrap">
              {product.sale && <span className="badge">{product.sale}</span>}
              <a href={product.link}>
                <img src={product.image} alt={product.name} />
              </a>
            </div>

            <div className="product-info">
              <h3>
                <a href={product.link}>{product.name}</a>
              </h3>
              <div className="price">
                <ins>${product.price.toFixed(2)}</ins>
                {product.oldPrice && (
                  <del>${product.oldPrice.toFixed(2)}</del>
                )}
              </div>
            </div>
          </li>
        </SwiperSlide>
        ))}
      </ul>
      </Swiper>
    </div>
  )
}

export default QualitySection
