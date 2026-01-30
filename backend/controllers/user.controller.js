import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

// ================= Signup =================
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // 1. Check for missing fields
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with this email",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // 5. Create JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= Login =================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check for missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 4. Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= Logout =================
export const logout = async (req, res) => {
  // For JWT, logout is usually handled on client side by deleting the token
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// ================= To update the user profile =================
export const updateProfile = async (req, res) => {
  const { profilePicture, fullname } = req.body;
  try {
    const userId = req.user._id;
    let updatedUser;

    if (!profilePicture) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullname },
        { new: true },
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePicture);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: upload.secure_url, fullname },
        { new: true },
      );
    }

    return res.json({
      success: false,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
