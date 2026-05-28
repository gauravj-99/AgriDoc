import { useEffect, useState } from "react";
import BackHome from "../components/BackHome";

const API_URL = "http://localhost:5000/api";

export default function Sell() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/listings`)
      .then((res) => res.json())
      .then(setListings)
      .catch(() => setListings([]));
  }, []);

  const handleSubmit = async () => {
    if (!cropName || quantity < 1 || price <= 0) {
      alert("Please complete all fields with valid values.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropName, quantity, price })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not create listing.");
      }

      setMessage(`Listing created: ${data.listing.cropName}, ${data.listing.quantity} kg at ₹${data.listing.price}/kg.`);
      setCropName("");
      setQuantity(1);
      setPrice(0);
      setListings((current) => [data.listing, ...current]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <BackHome />

      <h2>Sell Crops</h2>

      <div style={{ marginBottom: "16px" }}>
        <label>
          Crop Name:
          <input
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="Crop Name"
            style={{ marginLeft: "8px", padding: "8px", borderRadius: "6px", width: "100%" }}
          />
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
            style={{ marginLeft: "8px", padding: "8px", borderRadius: "6px", width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label>
          Price per kg:
          <input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ marginLeft: "8px", padding: "8px", borderRadius: "6px", width: "100%" }}
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        style={{ padding: "10px 18px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Submit
      </button>

      {message && (
        <div style={{ marginTop: "20px", padding: "12px", background: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
          {message}
        </div>
      )}

      {listings.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h3>Current Listings</h3>
          <ul>
            {listings.map((listing) => (
              <li key={listing.id} style={{ marginBottom: "8px" }}>
                {listing.cropName}: {listing.quantity} kg at ₹{listing.price}/kg
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
