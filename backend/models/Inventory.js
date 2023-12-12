import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    user_id: Number,
    item_id: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;
