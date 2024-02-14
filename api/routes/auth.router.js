import express from "express";
import colors from "colors";
import { Signup, Signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/google", google);
export default router;
