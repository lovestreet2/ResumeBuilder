import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "API/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.removeItem("user");
      setUser(null);
    }

    setIsLoading(false); // Stop loading regardless of whether user is found
  }, []);

  // Login function using axios
  const login = async (credentials) => {
    try {
      // Log the credentials being sent to the server
      console.log("Login credentials being sent:", credentials);

      // Send the login request using axios
      const response = await api.post(
        "/api/users/login",
        credentials // Ensure credentials is { email, password }
      );

      const { token, user } = response.data;

      // Store the token and user information
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Set the user in state
      setUser(user);
      console.log("User set in context, navigating to dashboard...");
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (error) {
      console.error("Error during login:", error);

      // Check if the error is from the response
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Error: ${error.response.data.message || "Login failed"}`);
      } else {
        // If no response, check the error configuration
        alert("An error occurred while making the request. Please try again.");
      }
    }
  };

  //registerUser function using axios
  const registerUser = async (credentials, navigate) => {
    if (!credentials.email || !credentials.password || !credentials.username) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      console.log("Sending user data:", credentials); // Debugging

      const response = await api.post(
        "BASE_URL/api/users/register",
        credentials
      );

      console.log("Response from server:", response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(`Error: ${error.response.data.message || "Registration failed"}`);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("No response from server. Check if the backend is running.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login"); // Navigate after logout
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
