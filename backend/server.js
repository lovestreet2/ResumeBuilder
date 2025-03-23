import express, { json } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

dotenv.config(); // Load environment variables from .env file

const app = express();

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());
app.use(json());

// Connect to database
connectDB();

// Routes
app.use("/api/resumes", resumeRoutes);
app.use("/api/users", userRoutes);

// Sample route for testing
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
