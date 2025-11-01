import React, { useEffect, useState } from "react";
import image from "../../../assets/images/user-icon-trendy-flat-style-600nw-1697898655-removebg-preview.png";
import { getOrdersByUserId } from "../../../api/orderApi";
import { format } from "date-fns";
import { CopyIcon } from "lucide-react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrdersByUserId(userId);
        setOrders(res?.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (orders.length === 0 && !loading)
    return <p className="text-center mt-5">No orders found.</p>;

  const statusColor = {
    pending: "text-yellow-500",
    claimed: "text-blue-500",
    Processing: "text-blue-500",
    "Reached Pickup Point": "text-indigo-500",
    shipped: "text-orange-500",
    "Picked Up": "text-orange-300",
    delivered: "text-green-500",
    cancelled: "text-red-500",
  };

  return (
    <div className="p-3 sm:p-5 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        My Orders
      </h2>

      {orders.map((order) => {
        const isExpanded = expandedOrderId === order._id;
        const productCount = order.products.length;
        const totalPayment = order.finalAmount;

        return (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg mb-4 shadow-sm"
          >
            {/* Order summary */}
            <div
              onClick={() => setExpandedOrderId(isExpanded ? null : order._id)}
              className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 items-start sm:items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">
                  {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-base sm:text-lg font-medium">
                    OrderID: {order.orderId}
                  </p>
                  <CopyIcon
                    size={14}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(order.orderId);
                      alert("OrderID copied to clipboard!");
                    }}
                  />
                </div>
                <p className="text-base sm:text-lg font-medium">
                  Order Status:{" "}
                  <span
                    className={`${
                      statusColor[order.status] || "text-gray-500"
                    } capitalize`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-base sm:text-lg font-medium">
                  Products: {productCount}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center w-full sm:w-auto">
                <div className="text-left sm:text-center">
                  <p className="text-lg font-semibold">₹{totalPayment}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {order.paymentStatus + " " + order.paymentMethod}
                  </p>
                </div>
                <button className="w-full sm:w-auto bg-black cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-800">
                  TRACK ORDER
                </button>
              </div>
            </div>

            {/* Expanded products */}
            {isExpanded && (
              <div className="p-4 border-t border-gray-200 bg-white space-y-4">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
                  >
                    <img
                      src={item.productId?.images?.[0] || image}
                      alt={item.productId?.name || "Product"}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="flex flex-col gap-1">
                      <h5 className="font-medium">
                        {item.productId?.name
                          ?.split(" ")
                          .slice(0, 10)
                          .join(" ") || "Unnamed Product"}
                      </h5>
                      {item.productId?.brand && (
                        <p className="text-gray-500 text-sm">
                          Brand: {item.productId.brand}
                        </p>
                      )}
                      <div className="flex gap-5 text-sm">
                        <p className="text-gray-500">
                          Weight:{" "}
                          <strong className="text-red-600">
                            {item.weight}
                          </strong>
                        </p>
                        <p className="text-gray-500">
                          Qty:{" "}
                          <strong className="text-red-600">
                            {item.quantity}
                          </strong>
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Price:{" "}
                        <strong className="text-red-800">₹{item.price}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {loading && <p className="text-center mt-5">Loading orders...</p>}
    </div>
  );
}

export default MyOrders;
