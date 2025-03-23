import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming you have a User model

const { genSalt, hash, compare } = bcrypt;

// Register a new user
const registerUser = async (req, res) => {
  try {
    console.log("Incoming request:", req.body); // Log incoming data

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    console.log("Hashing password...");
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create new user
    console.log("Creating new user...");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    // Log the incoming request body
    console.log("Received Request Body:", req.body);
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email and Password are invalid" });
    }

    // Check if password is provided and compare it with the stored hashed password
    if (!user.password) {
      return res
        .status(400)
        .json({ message: "User password not found in database" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Make sure to export them correctly
export { registerUser, loginUser };
