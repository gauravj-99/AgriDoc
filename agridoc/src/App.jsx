import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Detect from "./pages/Detect";
import Voice from "./pages/Voice";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/voice" element={<Voice />} />
      </Routes>
    </>
  );
}
