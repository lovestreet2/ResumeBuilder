import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "@/context/resumeContext.jsx";
import WorkExperiencePreview from "./WorkExperiencePreview";

const WorkExperience = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useContext(ResumeContext); // ✅ Use ResumeContext
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Initialize state from context (ensures experiences persist)
  const [experiences, setExperiences] = useState(resumeData.experiences || []);

  // Handle form submission
  const onSubmit = (data) => {
    const updatedExperiences = [...experiences, data];

    // ✅ Update local state
    setExperiences(updatedExperiences);

    // ✅ Update global resume context
    setResumeData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));

    reset(); // Reset form after submission
  };

  const handleNext = () => {
    navigate("/skill");
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Work Experience
        </h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Job Title Input */}
          <div className="mb-4">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="e.g., Software Engineer"
              {...register("jobTitle", { required: "Job title is required" })}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          {/* Company Name Input */}
          <div className="mb-4">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g., XYZ Corp"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Work Duration Input */}
          <div className="mb-4">
            <Label htmlFor="workDuration">Work Duration</Label>
            <Input
              id="workDuration"
              type="text"
              placeholder="e.g., Jan 2019 - Dec 2021"
              {...register("workDuration", {
                required: "Work duration is required",
              })}
            />
            {errors.workDuration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.workDuration.message}
              </p>
            )}
          </div>

          {/* Job Description (Optional) */}
          <div className="mb-4">
            <Label htmlFor="jobDescription">Job Description (Optional)</Label>
            <Textarea
              id="jobDescription"
              placeholder="Describe your job responsibilities here"
              {...register("jobDescription")}
            />
          </div>

          {/* Achievements (Optional) */}
          <div className="mb-4">
            <Label htmlFor="achievements">Achievements (Optional)</Label>
            <Textarea
              id="achievements"
              placeholder="List your achievements during this job"
              {...register("achievements")}
            />
          </div>

          {/* Skills Used (Optional) */}
          <div className="mb-4">
            <Label htmlFor="skillsUsed">Skills Used (Optional)</Label>
            <Textarea
              id="skillsUsed"
              placeholder="List the skills you used"
              {...register("skillsUsed")}
            />
          </div>

          {/* Technologies Used (Optional) */}
          <div className="mb-4">
            <Label htmlFor="technologiesUsed">
              Technologies Used (Optional)
            </Label>
            <Textarea
              id="technologiesUsed"
              placeholder="List the technologies or tools used"
              {...register("technologiesUsed")}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-between">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
            >
              Save
            </Button>
          </div>
        </form>

        {/* Display Personal Details Preview */}
        <WorkExperiencePreview WorkExperienceData={{ ...formData, image }} />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-xs cursor-pointer"
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
