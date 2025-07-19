import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerController = async (req, res) => {
  const { name, email, password, cnfPassword } = req.body;

  // validation
  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !cnfPassword.trim()
  ) {
    return res.status(400).json({ message: "Empty fields in data" });
  }
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validateEmail) {
    return res.status(400).json({ message: "Incorrect email address" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password too short, min 8 characters required" });
  }
  if (password !== cnfPassword) {
    return res.status(400).json({ message: "Password not matching" });
  }

  try {
    // User check if exists
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res
        .status(400)
        .json({ message: "User already exists", exists: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      role: "user",
      password: hashedPassword,
      isEvent: false,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Error in creating new user" });
    }
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim()) {
    return res
      .status(400)
      .json({ message: "Empty fields in data", success: false });
  }
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validateEmail) {
    return res
      .status(400)
      .json({ message: "Invalid Email address", success: false });
  }

  try {
    // user check in db
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res
        .status(400)
        .json({ message: "User does not exists", success: false });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Password", success: false });
    }

    const userToken = jwt.sign(
      { id: isUser._id, role: isUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.cookie("authToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    });
    const userData = {
      _id: isUser._id,
      name: isUser.name,
      email: isUser.email,
      role: isUser.role,
      bookings: isUser.bookings,
      event: isUser.event,
      isEvent: isUser.isEvent,
    };
    res.status(200).json({ message: "User loggedIn", success: true, userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const logoutController = (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 0,
  });
  res.status(200).json({ message: "User loggedOut", success: true });
};
