import { useState } from "react";
import BackHome from "../components/BackHome";

const API_URL = "http://localhost:5000/api";

export default function Detect() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${API_URL}/detect`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Detection failed.");
      }
      setResult(data.result);
    } catch (error) {
      alert(error.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <BackHome />

      <h2>Disease Detection</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setResult(null);
        }}
      />
      <br />
      <br />

      <button
        onClick={handleSubmit}
        style={{ padding: "10px 18px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Submit
      </button>

      {loading && (
        <p style={{ marginTop: "12px", color: "#1976d2" }}>
          Analysing image...
        </p>
      )}

      {result && (
        <div style={{ marginTop: "20px", padding: "12px", background: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
          <p><strong>Diagnosis:</strong> {result.diagnosis}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p>{result.notes}</p>
        </div>
      )}
    </div>
  );
}
