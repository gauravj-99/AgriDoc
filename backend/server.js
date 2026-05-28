import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5000;
const upload = multer();

const crops = [
  { name: "Wheat", price: 25 },
  { name: "Maize", price: 20 },
  { name: "Rice", price: 30 },
  { name: "Potato", price: 18 }
];

const orders = [];
const listings = [];

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", message: "AgriDoc backend is running" });
});

app.get("/api/crops", (req, res) => {
  res.json(crops);
});

app.get("/api/listings", (req, res) => {
  res.json(listings);
});

app.post("/api/orders", (req, res) => {
  const { crop, quantity, total } = req.body;

  if (!crop || !quantity || !total) {
    return res.status(400).json({ error: "Missing order details" });
  }

  const order = {
    id: orders.length + 1,
    crop,
    quantity,
    total,
    createdAt: new Date().toISOString(),
    sellerContact: "seller@example.com"
  };
  orders.push(order);

  return res.status(201).json({
    message: "Order placed successfully",
    order
  });
});

app.post("/api/listings", (req, res) => {
  const { cropName, quantity, price } = req.body;

  if (!cropName || !quantity || !price) {
    return res.status(400).json({ error: "Missing listing details" });
  }

  const listing = {
    id: listings.length + 1,
    cropName,
    quantity,
    price,
    createdAt: new Date().toISOString()
  };
  listings.push(listing);

  return res.status(201).json({
    message: "Listing created successfully",
    listing
  });
});

app.post("/api/detect", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image file." });
  }

  const result = {
    diagnosis: "No visible disease detected",
    confidence: "94%",
    notes: "Upload good-quality images for better analysis. This response is a mock result and should be replaced with a real detection model later."
  };

  return res.status(200).json({
    message: "Disease check completed",
    result
  });
});

app.listen(port, () => {
  console.log(`AgriDoc backend running on http://localhost:${port}`);
});
