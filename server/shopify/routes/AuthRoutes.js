import express from "express";
import { authController, refreshToken } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/auth", authController)
router.post("/refresh", refreshToken)

export default router;