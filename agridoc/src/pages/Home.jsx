import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home-title">🌾 AgriDoc</h1>
      <p className="home-subtitle">
        Smart assistance platform for farmers
      </p>

      <div className="feature-grid">
        {/* SELL */}
        <div className="feature-card" onClick={() => navigate("/sell")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1533/1533913.png"
            alt="Sell crops"
          />
          <h3>Sell Crops</h3>
          <p>Sell your crops directly</p>
        </div>

        {/* BUY */}
        <div className="feature-card" onClick={() => navigate("/buy")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Buy crops"
          />
          <h3>Buy Crops</h3>
          <p>Purchase crops easily</p>
        </div>

        {/* DETECT */}
        <div className="feature-card" onClick={() => navigate("/detect")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2913/2913461.png"
            alt="Disease detection"
          />
          <h3>Disease Detection</h3>
          <p>Detect crop diseases</p>
        </div>

        {/* VOICE */}
        <div className="feature-card" onClick={() => navigate("/voice")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/709/709682.png"
            alt="Voice assistant"
          />
          <h3>Voice Assistant</h3>
          <p>Speak instead of typing</p>
        </div>

        {/* CAMERA */}
        <div className="feature-card" onClick={() => navigate("/detect")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
            alt="Camera"
          />
          <h3>Camera</h3>
          <p>Capture crop image</p>
        </div>
      </div>
    </div>
  );
}
