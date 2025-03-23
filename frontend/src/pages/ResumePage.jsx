import React, { useState } from "react";
// Import ShadCN components
import { Button, Input, Textarea } from "@shadcn/ui"; // Replace with actual ShadCN imports if necessary

const ResumePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Save resume)
  const handleSave = () => {
    console.log("Saved Resume:", formData);
    // Logic for saving the resume goes here (e.g., API call)
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      summary: "",
      experience: "",
      education: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Create or Edit Resume
      </h1>

      <form>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label htmlFor="summary" className="block text-gray-700 mb-2">
            Professional Summary
          </label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Write a brief professional summary"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 mb-2">
            Work Experience
          </label>
          <Textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your work experience"
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Education */}
        <div className="mb-4">
          <label htmlFor="education" className="block text-gray-700 mb-2">
            Education
          </label>
          <Textarea
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Enter your educational background"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button Group */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full sm:w-auto py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset
          </Button>
          <Button
            variant="solid"
            onClick={handleSave}
            className="w-full sm:w-auto py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Resume
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResumePage;
