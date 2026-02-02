import { useState } from "react";
import BackHome from "../components/BackHome";

export default function Detect() {
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "16px" }}>
      <BackHome />

      <h2>Disease Detection</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setSubmitted(false);
        }}
      />
      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      {submitted && (
        <p style={{ marginTop: "12px", color: "green" }}>
          Image submitted successfully. AI analysis in progress...
        </p>
      )}
    </div>
  );
}
