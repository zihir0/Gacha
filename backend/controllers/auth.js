import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Player from "../models/Player.js";
import Admin from "../models/Admin.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { username, email, password } =
      req.body;

    // Check if the email already exists
    const existingUser = await Player.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Email already exists. Please use a different email." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Player({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ username: username });
    if (!player) return res.status(400).json({ msg: "Player does not exist." });

    const isMatch = await bcrypt.compare(password, player.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET);
    delete player.password;
    res.status(200).json({ token, user: player });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Player.findOne({ email: email });
    const role = admin.role;

    if (!admin) return res.status(400).json({ msg: "User does not exist." });

    if (admin.role === "admin") {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
      delete admin.password;
      res.status(200).json({ token, user: admin, role });
    } else {
      return res.status(400).json({ msg: "Account Not Admin" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
