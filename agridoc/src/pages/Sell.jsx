import BackHome from "../components/BackHome";

export default function Sell() {
  return (
    <div style={{ padding: "16px" }}>
      <BackHome />

      <h2>Sell Crops</h2>

      <input type="text" placeholder="Crop Name" />
      <br /><br />

      <input type="number" placeholder="Quantity (kg)" />
      <br /><br />

      <input type="number" placeholder="Price per kg" />
      <br /><br />

      <button>Submit</button>
    </div>
  );
}
