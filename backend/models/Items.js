import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rarity: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
    droprate: {
        type: Number,
        required: true,
  },
},
  { timestamps: true },
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;
