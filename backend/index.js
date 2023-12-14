import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { uploadImage } from "./controllers/image.js";
import itemNotlogRoutes from "./routes/item-notlog.js";
import itemRoutes from "./routes/item.js";
import adminRoutes from "./routes/admin.js";
import playerRoutes from "./routes/player.js";
import inventoryRoutes from "./routes/inventory.js";
import { addItem } from "./controllers/items.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("image"), register);
app.post("/upload/image", verifyToken, upload.single("image"), uploadImage);
app.post("/item/add", verifyToken, upload.single("image"), addItem);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/player", playerRoutes);
app.use("/items", itemRoutes);
app.use("/admin", adminRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/itemnotlog", itemNotlogRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
