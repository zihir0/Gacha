import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getInventory } from "../controllers/inventory.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getInventory);

export default router;
