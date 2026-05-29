import { orders } from "../data/store.js";

export const createOrder = (req, res) => {
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
};
