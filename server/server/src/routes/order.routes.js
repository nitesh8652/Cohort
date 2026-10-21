import express from "express";
import { createOrder, getMyOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { authUser, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authUser, authorize("customer"), createOrder);
router.get("/my", authUser, authorize("customer"), getMyOrders);
router.patch("/:id/status", authUser, authorize("owner"), updateOrderStatus);

export default router;
