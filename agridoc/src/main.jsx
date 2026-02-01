import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CropProvider } from "./context/CropContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CropProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CropProvider>
);
