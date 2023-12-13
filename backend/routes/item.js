import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deleteItem, getItem, getItems } from "../controllers/items.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getItem);
router.get("/", verifyToken, getItems);

router.delete("/:id", verifyToken, deleteItem);

export default router;
