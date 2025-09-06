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
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
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
        "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=500&q=80",
      price: 353.73,
      oldPrice: 178.43,
      sale: null,
      link: "https://demo2.wpopal.com/meatlers/shop/hand-cut-beef-fillet-steaks/",
      inStock: true,
    },
    {
      id: 98,
      name: "Country Chicken Legs",
      image:
        "./Country-chicken-Legs.png",
      price: 360.95,
      oldPrice: 444.01,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/beef-short-ribs/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 98,
      name: "Country Chicken Legs",
      image:
        "./Country-chicken-Legs.png",
      price: 360.95,
      oldPrice: 444.01,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/beef-short-ribs/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 102,
      name: "Full Country Chicken (With Skin)",
      image:
        "https://eangadi.in/image/cache/catalog/Seller_12/eangadi-chicken-Pannai-Nattu-Kozhi-Full-Skin-350x350.jpg",
      price: 105.01,
      oldPrice: 178.43,
      sale: "Sale 41%",
      link: "https://demo2.wpopal.com/meatlers/shop/sirloin-steaks/",
      inStock: true,
    },
    {
      id: 98,
      name: "Country Chicken Legs",
      image:
        "./Country-chicken-Legs.png",
      price: 360.95,
      oldPrice: 444.01,
      sale: "Sale 19%",
      link: "https://demo2.wpopal.com/meatlers/shop/beef-short-ribs/",
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
