import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";
import { errorHandler } from "../utils/errorHandler.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, roles = [] } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    errorHandler(res, error);
  }
};
