import { useEffect, useState } from "react";
import BackHome from "../components/BackHome";

const API_URL = "http://localhost:5000/api";

export default function Buy() {
  const [listings, setListings] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/listings`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setSelectedListingId(data[0]?.id?.toString() ?? "");
      })
      .catch(() => setError("Failed to load listings."))
      .finally(() => setLoading(false));
  }, []);

  const selectedListing = listings.find((item) => item.id === Number(selectedListingId));
  const total = selectedListing ? selectedListing.price * quantity : 0;

  const handleBuy = async () => {
    if (!selectedListing) {
      alert("Please select a valid listing.");
      return;
    }

    if (quantity < 1) {
      alert("Please enter a quantity of at least 1 kg.");
      return;
    }

    if (quantity > selectedListing.quantity) {
      alert(`Only ${selectedListing.quantity} kg is available for this listing.`);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: selectedListing.id, quantity })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not place order.");
      }

      setConfirmation(
        `Order #${data.order.id} placed: ${quantity} kg of ${selectedListing.cropName} at ₹${selectedListing.price}/kg. Total ₹${data.order.total}. Seller contact: ${data.order.sellerContact}`
      );
      setListings((current) => {
        return current
          .map((item) =>
            item.id === selectedListing.id
              ? { ...item, quantity: item.quantity - quantity }
              : item
          )
          .filter((item) => item.quantity > 0);
      });
      setQuantity(1);
      if (selectedListing.quantity === quantity) {
        setSelectedListingId((prev) => {
          const remaining = listings.filter((item) => item.id !== selectedListing.id);
          return remaining[0]?.id?.toString() ?? "";
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
        <BackHome />
        <h2>Loading listings...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
        <BackHome />
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <BackHome />

      <h2>Buy Crops</h2>

      {listings.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h3>Live Listings</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {listings.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: selectedListing?.id === item.id ? "2px solid #2e7d32" : "1px solid #ddd",
                  background: selectedListing?.id === item.id ? "#e8f5e9" : "#fff"
                }}
              >
                <div style={{ fontWeight: "700", marginBottom: "4px" }}>{item.cropName}</div>
                <div>Price: ₹{item.price}/kg</div>
                <div>Available: {item.quantity} kg</div>
                <div>Seller contact: {item.sellerContact}</div>
                <button
                  onClick={() => setSelectedListingId(item.id.toString())}
                  style={{ marginTop: "10px", padding: "8px 12px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  Select this listing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {listings.length === 0 ? (
        <p>No listings are available right now. Try again later.</p>
      ) : (
        <>
          <div style={{ marginBottom: "16px" }}>
            <label>
              Listing:
              <select
                value={selectedListingId}
                onChange={(e) => setSelectedListingId(e.target.value)}
                style={{ marginLeft: "8px", padding: "8px", borderRadius: "6px", width: "100%" }}
              >
                {listings.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.cropName} — ₹{item.price}/kg — {item.quantity} kg available
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
                max={selectedListing?.quantity ?? 1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ marginLeft: "8px", padding: "8px", width: "80px", borderRadius: "6px" }}
              />
            </label>
          </div>

          <p style={{ marginBottom: "16px" }}>
            Price per kg: <strong>₹{selectedListing?.price ?? 0}</strong>
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
        </>
      )}

      {confirmation && (
        <div style={{ marginTop: "20px", padding: "12px", background: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
          {confirmation}
        </div>
      )}
    </div>
  );
}
