import express from "express";
import {getOrdersbyDate, getOrdersbyMonth} from '../controllers/OrdersController.js'
import { getOrdersbyDateProcessed } from "../services/OrdersService.js";

const router = express.Router();

router.get("/orders", getOrdersbyDate)
router.get("/orders/processed", getOrdersbyDateProcessed)
router.get("/orders/month", getOrdersbyMonth)

export default router;
