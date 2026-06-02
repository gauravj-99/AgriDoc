import { useEffect, useState } from "react";
import BackHome from "../components/BackHome";

const API_URL = "http://localhost:5000/api";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setError("Failed to load order history."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <BackHome />
      <h2>Order History</h2>

      {loading ? (
        <p>Loading your orders…</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "12px", background: "#fff" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <strong>Order #{order.id}</strong>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Crop:</strong> {order.crop}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Quantity:</strong> {order.quantity} kg
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Unit price:</strong> ₹{order.unitPrice}/kg
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Total:</strong> ₹{order.total}
              </div>
              <div>
                <strong>Seller contact:</strong> {order.sellerContact}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
