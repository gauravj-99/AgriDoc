import express from "express";
import multer from "multer";
import { statusHandler } from "../controllers/statusController.js";
import { getCrops } from "../controllers/cropController.js";
import { getListings, createListing } from "../controllers/listingController.js";
import { createOrder } from "../controllers/orderController.js";
import { detectDisease } from "../controllers/detectController.js";

const router = express.Router();
const upload = multer();

router.get("/status", statusHandler);
router.get("/crops", getCrops);
router.get("/listings", getListings);
router.post("/orders", createOrder);
router.post("/listings", createListing);
router.post("/detect", upload.single("image"), detectDisease);

export default router;
