import { useState } from "react";

export default function Detect() {
  const [img, setImg] = useState(null);

  return (
    <div className="page">
      <h2>Crop Disease Detection</h2>

      <input type="file" accept="image/*" onChange={(e) =>
        setImg(URL.createObjectURL(e.target.files[0]))
      } />

      {img && <img src={img} className="image" alt="crop" />}

      <button onClick={() => alert("AI is analyzing the crop 🤖")}>
        Check Disease
      </button>
    </div>
  );
}
