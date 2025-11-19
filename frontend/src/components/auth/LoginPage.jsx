import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react"; // Import the loading spinner from Lucide/ShadCN
import api from "API/api";

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Assuming you have a login function in your context
  const [credentials, setCredentials] = useState({
    email: "", // Changed to email field
    password: "",
  });
  const [error, setError] = useState(""); // To capture any error message
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // To redirect after successful login

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setLoading(true); // Set loading state to true when the form is submitted

    // Check if fields are valid
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      // Send login request with credentials using axios
      const response = await api.post(
        "BASE_URL/api/users/login",
        credentials // Send the login credentials (email, password)
      );
      const { token } = response.data;

      // Store the token (for example, in localStorage or context)
      localStorage.setItem("authToken", token);

      // Call the login function from the context (optional)
      login(credentials);

      // Redirect to a different page after login (e.g., dashboard)
      navigate("/dashboard");
    } catch (error) {
      // Handle error if login fails
      if (error.response) {
        // Server returned a response
        setError(
          error.response.data.message || "Email or Password is Invalid."
        );
      } else if (error.request) {
        // No response from server
        setError("No response from the server. Please try again later.");
      } else {
        // Other errors
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h1 className="flex text-2xl font-bold mb-6 items-center justify-center">
          Login
        </h1>

        {/* Error message display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              required
            />

            {/* Forgot Password link */}
            <div className="flex justify-between mt-2">
              <div></div> {/* Empty div to fill space on the left */}
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            className="flex w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white mr-3" />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
