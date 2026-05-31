import { listings, orders } from "../data/store.js";

export const createOrder = (req, res) => {
  const { listingId, quantity } = req.body;

  if (!listingId || !quantity) {
    return res.status(400).json({ error: "Missing order details" });
  }

  const listing = listings.find((item) => item.id === parseInt(listingId, 10));
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const orderQuantity = Number(quantity);
  if (Number.isNaN(orderQuantity) || orderQuantity < 1) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  if (orderQuantity > listing.quantity) {
    return res.status(400).json({ error: "Requested quantity exceeds available listing quantity" });
  }

  const total = listing.price * orderQuantity;
  listing.quantity -= orderQuantity;

  if (listing.quantity === 0) {
    const index = listings.findIndex((item) => item.id === listing.id);
    if (index !== -1) {
      listings.splice(index, 1);
    }
  }

  const order = {
    id: orders.length + 1,
    listingId: listing.id,
    crop: listing.cropName,
    quantity: orderQuantity,
    unitPrice: listing.price,
    total,
    createdAt: new Date().toISOString(),
    sellerContact: listing.sellerContact
  };

  orders.push(order);

  return res.status(201).json({
    message: "Order placed successfully",
    order
  });
};
