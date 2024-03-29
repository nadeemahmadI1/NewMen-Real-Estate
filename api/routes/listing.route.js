import express from "express";
import { verifyToken } from "../Utils/verifyUser.js";

import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/deletelisting/:id", verifyToken, deleteListing);

export default router;
