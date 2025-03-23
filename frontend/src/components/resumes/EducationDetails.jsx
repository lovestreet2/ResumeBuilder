import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ResumeContext } from "@/context/resumeContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import EducationPreview from "./EducationPreview";

const EducationDetails = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = (data) => {
    const updatedEducation = [
      ...resumeData.education,
      { ...data, step: currentStep },
    ];

    setResumeData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));

    reset(); // Reset form
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/exp"); // Navigate to the experience page
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Education Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="schoolName">School/University Name</Label>
            <Input
              id="schoolName"
              type="text"
              placeholder="Enter school/university name"
              {...register("schoolName", {
                required: "School name is required",
              })}
            />
            {errors.schoolName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.schoolName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="degree">Degree/Certification</Label>
            <Input
              id="degree"
              type="text"
              placeholder="e.g., Bachelor's in Computer Science"
              {...register("degree", { required: "Degree is required" })}
            />
            {errors.degree && (
              <p className="text-red-500 text-sm mt-1">
                {errors.degree.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Input
              id="graduationYear"
              type="number"
              placeholder="Year of Graduation"
              {...register("graduationYear", {
                required: "Graduation year is required",
              })}
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.graduationYear.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="grade">Grade/CGPA</Label>
            <Input
              id="grade"
              type="text"
              placeholder="e.g., 3.8/4.0"
              {...register("grade", { required: "Grade/CGPA is required" })}
            />
            {errors.grade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
            >
              Add Education
            </Button>
          </div>
        </form>

        {/* Preview the added education details */}
        <EducationPreview educationList={resumeData.education} />

        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-xs cursor-pointer"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
