import Admin from "../models/Admin.js";
import Player from "../models/Player.js";

/* READ */
export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (admin) {
      const { username, email, } = req.body;

      // Check if the email already exists for another user
      const existingAdmin = await Admin.findOne({
        email: email,
        _id: { $ne: id },
      });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ msg: "Email already exists. Please use a different email." });
      }

      // Prepare the updated fields
      const updatedFields = {
        username,
        email,
      };

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      } else {
        res.status(200).json(updatedAdmin);
      }
    } else {
      res.status(404).json({ message: "Admin not found" });
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

