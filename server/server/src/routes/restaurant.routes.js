import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantRevenue,
} from "../controllers/restaurant.controller.js";
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menu.controller.js";
import { getRestaurantOrders } from "../controllers/order.controller.js";
import { getRestaurantReviews } from "../controllers/review.controller.js";
import { authUser, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Restaurants
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", authUser, authorize("owner"), createRestaurant);
router.patch("/:id", authUser, authorize("owner"), updateRestaurant);
router.delete("/:id", authUser, authorize("owner"), deleteRestaurant);

// Menu of a restaurant
router.get("/:id/menu", getMenu);
router.post("/:id/menu", authUser, authorize("owner"), createMenuItem);
router.patch("/:id/menu/:itemId", authUser, authorize("owner"), updateMenuItem);
router.delete("/:id/menu/:itemId", authUser, authorize("owner"), deleteMenuItem);

// Orders of a restaurant (owner dashboard)
router.get("/:id/orders", authUser, authorize("owner"), getRestaurantOrders);

// Reviews of a restaurant
router.get("/:id/reviews", getRestaurantReviews);

router.get("/:id/revenue", authUser, authorize("owner"), getRestaurantRevenue);

export default router;
