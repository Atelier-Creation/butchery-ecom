import React, { useRef } from "react";

const RecommendedSlider = ({ recommendedItems = [], onAddToCart }) => {
  const scrollRef = useRef(null);
  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="cart-drawer-recommend px-3 py-1 py-md-1 border-top">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">You may also like</h6>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle"
            onClick={() => scroll(-350)}
          >
            <i className="bi bi-chevron-left" />
          </button>
          <button
            className="btn btn-sm btn-outline-secondary rounded-circle"
            onClick={() => scroll(365)}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>

      <div
        className="d-flex overflow-auto flex-nowrap hide-scrollbar gap-3 pb-2"
        ref={scrollRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {recommendedItems?.slice(0, 10)?.map((item) => (
          <div
            key={item._id}
            className="d-flex flex-shrink-0 rounded p-2"
            style={{ width: "350px", minWidth: "300px" }}
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              className="me-3"
            />
            <div className="d-flex justify-content-between w-100">
              <div>
                <p className="mb-1 fw-semibold">{item.name?.trim().split(' ').slice(0, 3).join(' ')}</p>
                <p className="mb-1 small text-decoration-line-through text-muted">
                  ₹{item.variant[0].sizes[0].mrp}
                </p>
                <p className="mb-1 fw-bold price">₹{item.variant[0].sizes[0].sellingPrice}</p>
              </div>
              <button
                className="btn btn-link m-0 btn-sm p-0 text-dark"
                onClick={() =>
                  onAddToCart({
                    ...item,
                    id: item._id, // ensure id is present for consistent matching
                    color: item.variant?.[0]?.color || "Default",
                    size: item.variant?.[0]?.sizes?.[0]?.size || "Default",
                    price: item.variant?.[0]?.sizes?.[0]?.sellingPrice || item.price,
                    quantity: 1,
                    image: item.images?.[0] || item.image || "/fallback.png",
                  })
                }
                
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSlider;
