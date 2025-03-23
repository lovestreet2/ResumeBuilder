import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser); // Register a new user
userRoutes.post("/login", loginUser); // Login an existing user

export default userRoutes;
