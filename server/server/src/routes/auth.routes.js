import express from "express";
import { register, login, refresh, logout, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authUser, getMe);

export default router;
