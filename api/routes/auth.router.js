import express from "express";
import colors from "colors";
import {Signup,Signin}  from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
export default router;