import express from "express";
import multer from "multer";
import { statusHandler } from "../controllers/statusController.js";
import { getCrops } from "../controllers/cropController.js";
import { getListings, createListing } from "../controllers/listingController.js";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { detectDisease } from "../controllers/detectController.js";
import { registerProject, getProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();
const upload = multer();

router.get("/status", statusHandler);
router.get("/crops", getCrops);
router.get("/listings", getListings);
router.get("/orders", getOrders);
router.post("/orders", createOrder);
router.post("/listings", createListing);
router.post("/detect", upload.single("image"), detectDisease);

// Project Registration Routes
router.post("/projects/register", registerProject);
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;
