import express from "express";
import { getItem, getItems } from "../controllers/items.js";

const router = express.Router();

/* READ */
router.get("/:id", getItem);
router.get("/", getItems);

export default router;
