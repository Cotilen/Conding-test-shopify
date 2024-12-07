import express from "express";
import {getOrdersbyDate, getOrdersbyMonth} from '../controllers/OrdersController.js'
import { getOrdersbyDateProcessed } from "../services/OrdersService.js";
import {authMiddleware, authorizeRoles} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("admin"));

router.get("/orders", getOrdersbyDate)
router.get("/orders/processed", getOrdersbyDateProcessed)
router.get("/orders/month", getOrdersbyMonth)

export default router;
