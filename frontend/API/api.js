import axios from "axios";

// Automatically selects deployed backend if VITE_API_URL exists
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allow cookies/JWT tokens
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
