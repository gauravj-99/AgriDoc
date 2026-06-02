import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import OrderHistory from "./pages/OrderHistory";
import Detect from "./pages/Detect";
import Voice from "./pages/Voice";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}
