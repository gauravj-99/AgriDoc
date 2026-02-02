import BackHome from "../components/BackHome";

export default function Buy() {
  return (
    <div style={{ padding: "16px" }}>
      <BackHome />

      <h2>Buy Crops</h2>

      <ul>
        <li>🌾 Wheat – ₹25/kg</li>
        <li>🌽 Maize – ₹20/kg</li>
        <li>🍚 Rice – ₹30/kg</li>
        <li>🥔 Potato – ₹18/kg</li>
      </ul>

      <p>Select crops and contact seller (feature coming soon).</p>
    </div>
  );
}
