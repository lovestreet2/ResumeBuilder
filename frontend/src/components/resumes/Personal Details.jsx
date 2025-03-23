import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ResumeContext } from "@/context/resumeContext";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import PersonalPreview from "./PersonalPreview";

const PersonalDetails = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: resumeData.personalDetails || {} });

  const formData = watch(); // Watching form values in real-time

  const onSubmit = (data) => {
    setResumeData((prevData) => ({
      ...prevData,
      personalDetails: { ...data, image },
    }));
    console.log("Form Data Submitted: ", data);
    reset(); // Reset form after submission
  };

  const handleSaveAndNext = (data) => {
    setResumeData((prevData) => ({
      ...prevData,
      personalDetails: { ...data, image },
    }));
    console.log("Form Data Submitted: ", data);
    navigate("/educate");
    reset(); // Optionally reset the form or update state for next section
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Personal Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture Upload */}
          <div className="mb-6 text-center">
            <label
              htmlFor="profile-picture"
              className="block text-lg font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleImageChange}
            />
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full mx-auto"
                />
              </div>
            )}
          </div>

          {/* First Name Input */}
          <div className="mb-4">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number format",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="123 Main St, City, Country"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
            >
              Save Details
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(handleSaveAndNext)}
              className="bg-green-600 hover:bg-green-700 text-white w-full max-w-xs cursor-pointer"
            >
              Save and Next
            </Button>
          </div>
        </form>

        {/* Display Personal Details Preview */}
        <PersonalPreview personalData={{ ...formData, image }} />
      </div>
    </div>
  );
};

export default PersonalDetails;
