import { listings } from "../data/store.js";

export const getListings = (req, res) => {
  res.json(listings);
};

export const createListing = (req, res) => {
  const { cropName, quantity, price } = req.body;

  if (!cropName || !quantity || !price) {
    return res.status(400).json({ error: "Missing listing details" });
  }

  const listing = {
    id: listings.length + 1,
    cropName,
    quantity,
    price,
    sellerContact: "seller@example.com",
    createdAt: new Date().toISOString()
  };

  listings.push(listing);

  return res.status(201).json({
    message: "Listing created successfully",
    listing
  });
};
