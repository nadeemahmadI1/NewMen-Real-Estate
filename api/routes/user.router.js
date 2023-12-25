import express from "express";
import colors from "colors";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/test',test);
export default router;
