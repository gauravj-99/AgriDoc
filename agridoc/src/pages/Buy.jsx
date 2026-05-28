import { useEffect, useState } from "react";
import BackHome from "../components/BackHome";

const API_URL = "http://localhost:5000/api";

export default function Buy() {
  const [cropOptions, setCropOptions] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/crops`)
      .then((res) => res.json())
      .then((data) => {
        setCropOptions(data);
        setSelectedCrop(data[0]?.name ?? "");
      })
      .catch(() => {
        setCropOptions([
          { name: "Wheat", price: 25 },
          { name: "Maize", price: 20 },
          { name: "Rice", price: 30 },
          { name: "Potato", price: 18 }
        ]);
        setSelectedCrop("Wheat");
      })
      .finally(() => setLoading(false));
  }, []);

  const crop = cropOptions.find((item) => item.name === selectedCrop) || { price: 0 };
  const total = crop.price * quantity;

  const handleBuy = async () => {
    if (quantity < 1) {
      alert("Please enter a quantity of at least 1 kg.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: selectedCrop, quantity, total })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not place order.");
      }

      setConfirmation(
        `Order placed: ${quantity} kg of ${selectedCrop} at ₹${crop.price}/kg. Total ₹${total}. Seller contact: ${data.order.sellerContact}`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
        <BackHome />
        <h2>Loading crop list...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <BackHome />

      <h2>Buy Crops</h2>

      <div style={{ marginBottom: "16px" }}>
        <label>
          Crop:
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            style={{ marginLeft: "8px", padding: "8px", borderRadius: "6px" }}
          >
            {cropOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name} — ₹{item.price}/kg
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>
          Quantity (kg):
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ marginLeft: "8px", padding: "8px", width: "80px", borderRadius: "6px" }}
          />
        </label>
      </div>

      <p style={{ marginBottom: "16px" }}>
        Price per kg: <strong>₹{crop.price}</strong>
      </p>
      <p style={{ marginBottom: "16px" }}>
        Total: <strong>₹{total}</strong>
      </p>

      <button
        onClick={handleBuy}
        style={{ padding: "10px 18px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Confirm Purchase
      </button>

      {confirmation && (
        <div style={{ marginTop: "20px", padding: "12px", background: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
          {confirmation}
        </div>
      )}
    </div>
  );
}
