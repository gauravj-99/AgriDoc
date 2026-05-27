import { useState } from "react";
import BackHome from "../components/BackHome";

const cropOptions = [
  { name: "Wheat", price: 25 },
  { name: "Maize", price: 20 },
  { name: "Rice", price: 30 },
  { name: "Potato", price: 18 },
];

export default function Buy() {
  const [selectedCrop, setSelectedCrop] = useState(cropOptions[0].name);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState("");

  const crop = cropOptions.find((item) => item.name === selectedCrop);
  const total = crop.price * quantity;

  const handleBuy = () => {
    if (quantity < 1) {
      alert("Please enter a quantity of at least 1 kg.");
      return;
    }

    setConfirmation(
      `You selected ${quantity} kg of ${selectedCrop} at ₹${crop.price}/kg. Total ₹${total}. Seller contact details will be available soon.`
    );
  };

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
