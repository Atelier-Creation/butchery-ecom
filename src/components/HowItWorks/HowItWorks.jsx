import React from 'react'
import './HowItWorks.css'
const steps = [
    {
      id: 1,
      iconClass: "bi-box-seam", // bootstrap icon
      title: "Choose Your Favourites",
      desc: `Place your order on our website, app, or just give us a call. Then, pick a delivery date that suits you best. We're all about making things straightforward for you!`,
    },
    {
      id: 2,
      iconClass: "bi-award", // bootstrap icon
      title: "Freshness Guaranteed",
      desc: `Once you've made your choice, we'll cut your meat and pack it into our specially designed cool boxes. Prepared for next-day delivery, we promise peak freshness from our door to yours.`,
    },
    {
      id: 3,
      iconClass: "bi-truck", // bootstrap icon
      title: "Delivery to Your Doorstep",
      desc: `Receive your box of freshly cut meats, ready to cook or freeze, at your convenience. Enjoy top-notch cuts with minimal fuss, exactly when you need them.`,
    },
  ];
function HowItWorks() {
  return (
    <section className="hiw-section" data-id="hiw-15a3321">
    <div className="hiw-inner">
      <div className="hiw-heading-wrap">
        <h2 className="hiw-heading">How buying meat online works — Simply Brilliant!</h2>
      </div>

      <div className="hiw-grid" role="list">
        {steps.map((s) => (
          <article key={s.id} className="hiw-card" role="listitem" aria-labelledby={`hiw-title-${s.id}`}>
            <div className="hiw-icon-wrap" aria-hidden="true">
              <span className="hiw-icon-outer">
                <i className={`hiw-icon bi ${s.iconClass}`} />
              </span>
            </div>

            <div className="hiw-content">
              <h5 id={`hiw-title-${s.id}`} className="hiw-card-title">{s.title}</h5>
              <p className="hiw-card-desc">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
  )
}

export default HowItWorks
