import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="AgriDoc Logo" className="navbar-logo" />
        <span className="navbar-title">AgriDoc</span>
      </div>
    </nav>
  );
}
