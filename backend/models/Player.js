import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", PlayerSchema);
export default Player;
