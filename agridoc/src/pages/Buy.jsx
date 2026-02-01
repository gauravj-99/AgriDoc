const crops = [
  { id: 1, name: "Wheat", qty: 50, price: 2000, loc: "Meerut" },
  { id: 2, name: "Rice", qty: 80, price: 3200, loc: "Lucknow" },
];

export default function Buy() {
  return (
    <div className="page">
      <h2>Buy Crops</h2>

      {crops.map((c) => (
        <div className="card" key={c.id}>
          <h3>{c.name}</h3>
          <p>Quantity: {c.qty} kg</p>
          <p>Price: ₹{c.price}</p>
          <p>Location: {c.loc}</p>
          <button>Contact Seller</button>
        </div>
      ))}
    </div>
  );
}
