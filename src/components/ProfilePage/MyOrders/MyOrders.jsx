import React, { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 4; // Number of orders to fetch per request
  const SCROLL_THRESHOLD =900; // Load more items when the user is this many pixels from the bottom

  useEffect(() => {
    if (!userId || !hasMore) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/order/user/${userId}`,
          {
            params: {
              page: page,
              limit: LIMIT,
            },
          }
        );
        let fetchedOrders = res.data.orders || [];
        
        // Attach product details to each order item
        const ordersWithProducts = await Promise.all(
          fetchedOrders.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const product = await getProductById(item.productId);
                  return { ...item, product };
                } catch (err) {
                  console.error("Error fetching product details:", err);
                  return item; // fallback
                }
              })
            );
            return { ...order, items: itemsWithDetails };
          })
        );
        
        setOrders((prevOrders) => [...prevOrders, ...ordersWithProducts]);
        setHasMore(fetchedOrders.length > 0);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, page, hasMore]);


  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);
  

  if (orders.length === 0 && !loading) return <p>No orders found.</p>;

  return (
    <div className="my-orders">
      <h2 className="mb-3 mt-0">My Orders</h2>
      {orders.map((order) =>
      order.items.map((item) => (
      <div key={item._id} className="my-order-new-con">
        <img src={item.product?.images?.[0] || image}/>
        <div className="my-order-new-content-div">
        {item.product?.brand?.length > 0 && <p>Brand : {item.product.brand}</p>}
          <h5>{item.product?.name.split(' ').slice(0, 10).join(' ') || item.productName.split(' ').slice(0, 10).join(' ')}</h5>
          {item.product?.color?.length > 0 && <p>Color : {item.product.color}</p>}
        </div>
        <button className="my-order-new-content-button">
          TRACK ORDER
        </button>
      </div>
      ))
      )}
      {loading && <p>Loading more orders...</p>}
      {!loading && !hasMore && orders.length > 0 && (
        <p style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.2em', color: '#666' }}>
          That's it! You have viewed all your orders.
        </p>
      )}
    </div>
  );
}

export default MyOrders;