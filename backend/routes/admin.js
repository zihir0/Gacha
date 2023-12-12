import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { deletePlayer, getAdmin } from "../controllers/admin.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getAdmin);

router.delete("/delete/player/:id", verifyToken, deletePlayer);

export default router;