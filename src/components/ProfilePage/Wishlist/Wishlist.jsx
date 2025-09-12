import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
function Wishlist({ userId }) {
    const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWishlist(userId);
        setWishlist(response);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchWishlist();
  }, [userId]);

  if (loading) return <p>Loading wishlist...</p>;
  console.log("Wishlist items:", wishlist);

  if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product._id || product.id,
      name: product.name,
      price: product.variant?.[0]?.sizes?.[0]?.sellingPrice || 0,
      color: product.variant?.[0]?.title || "",
      size: product.variant?.[0]?.sizes?.[0]?.size || "",
      quantity: 1,
      image: product?.variant?.[0]?.images?.[0]?.url || product.images?.[0]
    };
    addToCart(cartItem);
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid mt-5">
        {wishlist?.map((product) => (
          <div key={product._id} className="wishlist-item" style={{cursor: 'pointer'}} onClick={() => navigate(`/product/${product._id}` || `/product/${product.id}` || `/product/${product.productId._id}`)}>
            <i class="bi bi-heart-fill"></i>
            <img
              src={
                product?.variant?.[0]?.images?.[0]?.url || product.images?.[0]
              }
              alt={product.name}
            />
            <div className="wishlist-item-details-div">
            <h6>{product.name.split(' ').slice(0, 3).join(' ')}</h6>
            {/* <p>Brand: <strong>{product.brand}</strong></p> */}

            {/* Variant Title */}
            {/* <p>Color: <strong> {product.variant?.[0]?.title}</strong></p> */}

            {/* Size & Selling Price */}
            <p>
  Price: <strong>₹{product.variant?.[0]?.sizes?.[0]?.sellingPrice}</strong>
</p>
<div className="profilepage-wishlist-add-to-cart-btn">
<button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating to product page
                handleAddToCart(product);
              }}
            >
              + Add to Cart
            </button>
</div>
</div>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
