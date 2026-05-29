import { crops } from "../data/store.js";

export const getCrops = (req, res) => {
  res.json(crops);
};
