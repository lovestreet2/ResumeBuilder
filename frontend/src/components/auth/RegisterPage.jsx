import { AuthContext } from "@/context/authContext";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react"; // Import Loader icon

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext); // Get registerUser from context
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  const [credentials, setCredentials] = useState({
    username: "", // ✅ Changed from username to fullname
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await registerUser(credentials, navigate); // ✅ Pass navigate function
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h1 className="flex text-2xl font-bold mb-6 items-center justify-center">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UserName
            </label>
            <input
              type="text"
              name="username" // ✅ Changed from username to fullname
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

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
          </div>

          <Button
            type="submit"
            className="flex w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white mr-3" />
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          I have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
