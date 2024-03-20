import express from "express";
import colors from "colors";
import { test, updateUser,deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
