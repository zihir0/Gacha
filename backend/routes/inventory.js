import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addItemToInventory,
  getInventory,
  getInvetoryByPlayer,
} from "../controllers/inventory.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getInventory);
router.get("/player/:id", verifyToken, getInvetoryByPlayer);

router.post("/add", verifyToken, addItemToInventory);

export default router;
