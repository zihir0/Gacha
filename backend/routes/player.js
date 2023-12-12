import express from "express";
import {
  getPlayer,
  getPlayers,
} from "../controllers/player.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getPlayer);
router.get("/", verifyToken, getPlayers);

export default router;
