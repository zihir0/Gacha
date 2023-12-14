import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addItemToInventory,
  deleteInventory,
  getInventory,
  getInvetoryByPlayer,
} from "../controllers/inventory.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getInventory);
router.get("/player/:id", verifyToken, getInvetoryByPlayer);

router.post("/add", verifyToken, addItemToInventory);
router.delete("/delete/:id", verifyToken, deleteInventory);

export default router;
