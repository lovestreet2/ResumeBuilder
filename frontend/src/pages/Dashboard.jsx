import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [error, setError] = useState("");

  const handleCreateClick = () => {
    if (!resumeTitle.trim()) {
      setError("Title is required!");
      return;
    }
    console.log("Creating Resume:", resumeTitle);
    setError(""); // Clear error
    setOpenDialog(false); // Close dialog
    // Navigate to the "Create" page
    navigate("/person");
  };

  const handleLogout = () => {
    logout(navigate);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark mode
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors`}
    >
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="flex items-center justify-center text-2xl font-bold">
            Dashboard
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-200">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-600 text-white min-h-screen p-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold"></h2>
            <p className="text-sm">{user?.name}</p>
          </div>
          <ul>
            <li>
              <Button
                onClick={() => setOpenDialog(true)}
                className="block text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Create a New Resume
              </Button>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={"text-white"}>
                      Create New Resume
                    </DialogTitle>
                    <DialogDescription>
                      <p>Add a title for your new resume</p>
                      <Input
                        className="my-2"
                        placeholder="Ex.Full Satck resume"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        required
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </DialogDescription>
                    <div className="flex justify-end gap-2">
                      <Button
                        className="bg-red-500 hover:bg-red-600 cursor-pointer"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                      >
                        Cancle
                      </Button>
                      <Button
                        onClick={handleCreateClick}
                        className="cursor-pointer"
                      >
                        Create
                      </Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <Link
                to="/profile"
                className="block text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDarkMode}
                className="w-full mt-4 py-2 px-4 rounded-md text-white bg-gray-800 hover:bg-gray-900 cursor-pointer"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full mt-4 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Here's your dashboard overview.
            </p>
          </div>

          {/* Notifications Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 1
              </h3>
              <p className="text-gray-600">
                You have a pending resume draft. Don't forget to finish it!
              </p>
            </div>
            <div className="bg-green-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 2
              </h3>
              <p className="text-gray-600">
                Your resume was successfully saved! Check it out.
              </p>
            </div>
            <div className="bg-blue-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 3
              </h3>
              <p className="text-gray-600">
                We added new resume templates! Try them now.
              </p>
            </div>
            <div className="bg-orange-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 4
              </h3>
              <p className="text-gray-600">
                We added new resume templates! Try them now.
              </p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 5
              </h3>
              <p className="text-gray-600">
                Your resume was successfully saved! Check it out.
              </p>
            </div>
            <div className="bg-pink-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Notification 6
              </h3>
              <p className="text-gray-600">
                Your resume was successfully saved! Check it out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-0">
        <p>&copy; 2025 Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
