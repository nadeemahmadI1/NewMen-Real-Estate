import express from "express";
import colors from "colors";
import {Signup}  from "../controllers/signup.controller.js";
const router = express.Router();

router.post("/", Signup);
export default router;