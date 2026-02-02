import { useNavigate } from "react-router-dom";

export default function BackHome() {
  const navigate = useNavigate();

  return (
    <button className="back-home-btn" onClick={() => navigate("/")}>
      ← Back to Home
    </button>
  );
}
