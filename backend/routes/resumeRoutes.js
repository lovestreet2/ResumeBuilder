import { Router } from "express";
import {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const resumeRoutes = Router();

// Use the correct route method for defining the routes
resumeRoutes.post("/", authMiddleware, createResume); // Create a resume
resumeRoutes.get("/:userId", authMiddleware, getResumes); // Get resumes for a user
resumeRoutes.put("/:id", authMiddleware, updateResume); // Update a specific resume
resumeRoutes.delete("/:id", authMiddleware, deleteResume); // Delete a specific resume

export default resumeRoutes;
