import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    user_id: mongoose.Schema.Types.ObjectId,
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
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
