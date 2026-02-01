import { useState, useContext, useEffect } from "react";
import { CropContext } from "../context/CropContext";

export default function Sell() {
  const { cropData } = useContext(CropContext);

  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (cropData) {
      setCrop(cropData.crop || "");
      setQuantity(cropData.quantity || "");
      setPrice(cropData.price || "");
    }
  }, [cropData]);

  function handleSubmit(e) {
    e.preventDefault();
    alert("Crop submitted successfully 🌾");
  }

  return (
    <div className="page">
      <h2>Sell Crops</h2>

      <form onSubmit={handleSubmit}>
        <label>Crop Name</label>
        <input
          value={crop}
          onChange={(e) =>
            setCrop(e.target.value.replace(/[^a-zA-Z ]/g, ""))
          }
          placeholder="Only text"
          required
        />

        <label>Quantity (kg)</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Only numbers"
          required
        />

        <label>Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Location</label>
        <input
          value={location}
          onChange={(e) =>
            setLocation(e.target.value.replace(/[^a-zA-Z ]/g, ""))
          }
          placeholder="Village / District"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
