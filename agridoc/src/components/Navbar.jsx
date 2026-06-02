import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="AgriDoc Logo" className="navbar-logo" />
        <span className="navbar-title">AgriDoc</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/buy" className="nav-link">Buy</Link>
        <Link to="/sell" className="nav-link">Sell</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        <Link to="/detect" className="nav-link">Detect</Link>
        <Link to="/voice" className="nav-link">Voice</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/projects" className="nav-link">Projects</Link>
      </div>
    </nav>
  );
}
