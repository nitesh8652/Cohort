import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { cartValidator } from "../validator/cartValidator.js";
import { addToCart } from "../controller/cart.controller.js";

const router = Router()

// /api/cart
router.post("/", authenticate, cartValidator, addToCart)

export default router
