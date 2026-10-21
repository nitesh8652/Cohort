import express from "express";
import { createReview } from "../controllers/review.controller.js";
import { authUser, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authUser, authorize("customer"), createReview);

export default router;
