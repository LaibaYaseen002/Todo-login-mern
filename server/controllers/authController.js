import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPass });
    await newUser.save();

    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json({ msg: "Registration error", error: err });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ msg: "Login error", error: err });
  }
};
export default authMiddleware;
