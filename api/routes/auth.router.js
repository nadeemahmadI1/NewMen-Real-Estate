import express from "express";
import colors from "colors";
import { Signup, Signin, google, signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post("/google", google);
router.get("/signout", signout);
export default router;
