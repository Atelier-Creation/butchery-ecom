import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import image from '../../../assets/images/user-icon-trendy-flat-style-600nw-1697898655-removebg-preview.png';
import { getOrdersByUserId } from "../../../api/orderApi";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get userId from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrdersByUserId(userId);
        let fetchedOrders = res?.data || [];
        setOrders(fetchedOrders); // ✅ only set once
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]); // ✅ remove page & hasMore dependencies

  if (orders.length === 0 && !loading) return <p>No orders found.</p>;

  return (
    <div className="my-orders">
      <h2 className="mb-3 mt-0">My Orders</h2>
      {orders.map((order) =>
        order.products.map((item) => (
          <div key={item._id} className="my-order-new-con">
            <img src={item.productId?.images?.[0] || image} alt="product" />
            <div className="my-order-new-content-div">
              {item.productId?.brand?.length > 0 && (
                <p>Brand : {item.productId.brand}</p>
              )}
              <h5>
                {item.productId?.name
                  ?.split(" ")
                  .slice(0, 10)
                  .join(" ") || "Unnamed Product"}
              </h5>
              {item.productId?.color?.length > 0 && (
                <p>Color : {item.productId.color}</p>
              )}
            </div>
            <button className="my-order-new-content-button">
              TRACK ORDER
            </button>
          </div>
        ))
      )}
      {loading && <p>Loading orders...</p>}
    </div>
  );
}

export default MyOrders;
