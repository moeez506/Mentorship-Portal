import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Mentor from "../models/mentor.js";
import Student from "../models/student.js";

// Set Cookie
const setTokenCookie = (res, token, userType) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("userType", userType, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// Check if user is already logged in before login
const checkAlreadyLoggedIn = (req) => {
  const token = req.cookies.token;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};

// Logout Function
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("userType");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Student Login
export const studentLogin = async (req, res) => {
  try {
    if (checkAlreadyLoggedIn(req)) {
      return res.status(400).json({ message: "User already logged in" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    setTokenCookie(res, token, "student");

    res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Mentor Login
export const mentorLogin = async (req, res) => {
  try {
    if (checkAlreadyLoggedIn(req)) {
      return res.status(400).json({ message: "User already logged in" });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, mentor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ mentorId: mentor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    setTokenCookie(res, token, "mentor");

    res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Error during mentor login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const { studentId, mentorId } = req.user;

    let user;
    if (studentId) {
      user = await Student.findById(studentId).select('-password'); // Exclude password
    } else if (mentorId) {
      user = await Mentor.findById(mentorId).select('-password'); // Exclude password
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};