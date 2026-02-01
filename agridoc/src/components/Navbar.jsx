import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🌾 AgriDoc</h2>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/sell">Sell</NavLink>
        <NavLink to="/buy">Buy</NavLink>
        <NavLink to="/detect">Detect</NavLink>
        <NavLink to="/voice">Voice</NavLink>
      </div>
    </nav>
  );
}
