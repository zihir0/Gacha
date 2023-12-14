import Player from "../models/Player.js";

/* READ */
export const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findById(id);
    res.status(200).json(player);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatePlayerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);

    if (player) {
      const { username, email } = req.body;

      // Check if the email already exists for another user
      const existingPlayer = await Player.findOne({
        email: email,
        _id: { $ne: id },
      });
      if (existingPlayer) {
        return res
          .status(400)
          .json({ msg: "Email already exists. Please use a different email." });
      }

      // Prepare the updated fields
      const updatedFields = {
        username,
        email,
      };

      const updatedPlayer = await Player.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      } else {
        res.status(200).json(updatedPlayer);
      }
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await Player.findByIdAndDelete(id);
    res.status(200).json(player);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
