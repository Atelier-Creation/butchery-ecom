import React from 'react'
import './OurBlog.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuArrowUpRight,LuArrowRight } from "react-icons/lu";
const blogs = [
    {
      id: 1,
      date: "December 9, 2024",
      updated: "December 16, 2024",
      category: "Cooking Tips",
      author: "admin",
      comments: "3 Comments",
      title: "What Makes Artisan Butchers Stand Out?",
      excerpt:
        "Amet minim mollit non deserunt ullamco est sit aliqua amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet…",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/blog_12-1060x600.jpg",
      link: "https://demo2.wpopal.com/meatlers/what-makes-artisan-butchers-stand-out/",
    },
    {
      id: 2,
      date: "December 9, 2024",
      updated: "December 21, 2024",
      category: "Cooking Tips",
      author: "admin",
      comments: "3 Comments",
      title: "The Science of Meat Aging Explained",
      excerpt:
        "Amet minim mollit non deserunt ullamco est sit aliqua amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet…",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/blog_11-1060x600.jpg",
      link: "https://demo2.wpopal.com/meatlers/the-science-of-meat-aging-explained/",
    },
    {
      id: 3,
      date: "December 9, 2024",
      updated: "December 21, 2024",
      category: "Kitchen",
      author: "admin",
      comments: "3 Comments",
      title: "Exploring the World of Premium Meats",
      excerpt:
        "Amet minim mollit non deserunt ullamco est sit aliqua amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet…",
      image:
        "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/blog_10-1060x600.jpg",
      link: "https://demo2.wpopal.com/meatlers/exploring-the-world-of-premium-meats/",
    },
    // {
    //   id: 4,
    //   date: "December 9, 2024",
    //   updated: "December 21, 2024",
    //   category: "Kitchen",
    //   author: "admin",
    //   comments: "3 Comments",
    //   title: "Butchers’ Secrets for Perfect Meat Cuts",
    //   excerpt:
    //     "Amet minim mollit non deserunt ullamco est sit aliqua amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet…",
    //   image:
    //     "https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/blog_9-1060x600.jpg",
    //   link: "https://demo2.wpopal.com/meatlers/butchers-secrets-for-perfect-meat-cuts/",
    // },
  ];
function OurBlog() {
  return (
    <section className="blog-section">
      <div className="blog-header">
        <p className="blog-subtitle">Our Blog</p>
        <h2 className="blog-title">Latest News From The Blogs</h2>
      </div>

      <Swiper
        className="blog-swiper"
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.3, spaceBetween: 15 },
          480: { slidesPerView: 2.3, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <div className="blog-card">
              <div className="blog-image">
                <div className="blog-date">
                  <a href={blog.link}>
                    <time dateTime={blog.date}>{blog.date}</time>
                  </a>
                </div>
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <div className="blog-category">
                    <a href="#">{blog.category}</a>
                  </div>
                  <div className="blog-author">
                    <i className="meatlers-icon-user"></i>
                    <a href="#">{blog.author}</a>
                  </div>
                  <div className="blog-comments">
                    <i className="meatlers-icon-comments"></i>
                    <a href="#">{blog.comments}</a>
                  </div>
                </div>
                <h3 className="blog-heading">
                  <a href={blog.link}>{blog.title}</a>
                </h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-readmore">
                  <a href={blog.link} className='icons-chages'>
                    Read More
                    <span className="footer-btn-icon">
          <LuArrowUpRight className="icon upright" />
          <LuArrowRight className="icon right" />
        </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default OurBlog
