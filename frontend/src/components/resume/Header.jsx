import React from "react";
// You may import components from ShadCN if needed, like buttons or UI elements.

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white">
      {/* Logo Section */}
      <div className="text-2xl font-semibold">
        <h1>Resume Builder</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 text-center">
        <ul className="flex justify-center space-x-6">
          <li>
            <a
              href="#home"
              className="text-white hover:text-gray-300 font-bold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white hover:text-gray-300 font-bold"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white hover:text-gray-300 font-bold"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Start New Resume Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          Start New Resume
        </button>
      </div>
    </header>
  );
};

export default Header;
