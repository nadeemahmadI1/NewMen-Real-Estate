import express from "express";
import { verifyToken } from "../Utils/verifyUser.js";

import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/deletelisting/:id", verifyToken, deleteListing);
router.post("/updatelisting/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);

export default router;
