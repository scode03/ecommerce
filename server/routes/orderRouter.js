import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";

import {
  CreateOrder,
  ViewAllOrder,
  DetailOrder,
  CurrentUserOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// POST /api/v1/order
// Authenticated users only
router.post("/", protectedMiddleware, CreateOrder);

// GET /api/v1/order
// Owner role only
router.get("/", protectedMiddleware, adminMiddleware, ViewAllOrder);

// GET /api/v1/order/:id
// Owner role only
router.get("/:id", protectedMiddleware, adminMiddleware, DetailOrder);

// GET /api/v1/order/current/user
// Authenticated users only
router.get("/current/user", protectedMiddleware, CurrentUserOrder);

export default router;
