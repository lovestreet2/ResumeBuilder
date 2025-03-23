import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "../../context/ResumeContext"; // Import ResumeContext

const ResumeSections = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useContext(ResumeContext); // Use context
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  // Handle form submission for certifications, languages, and references
  const onSubmitCertifications = (data) => {
    setResumeData({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), data],
    });
    reset();
    setCurrentStep(2);
  };

  const onSubmitLanguages = (data) => {
    setResumeData({
      ...resumeData,
      languages: [...(resumeData.languages || []), data],
    });
    reset();
    setCurrentStep(3);
  };

  const onSubmitReferences = (data) => {
    setResumeData({
      ...resumeData,
      references: [...(resumeData.references || []), data],
    });
    reset();
  };

  const handleNext = () => {
    navigate("/finalresume");
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Resume Details
        </h2>

        {/* Certifications Form */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmit(onSubmitCertifications)}>
            <div className="mb-4">
              <Label htmlFor="certificationName">Certification Name</Label>
              <Input
                id="certificationName"
                type="text"
                placeholder="e.g., AWS Certified Developer"
                {...register("certificationName", {
                  required: "Certification name is required",
                })}
              />
              {errors.certificationName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.certificationName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="certificationDate">Certification Date</Label>
              <Input
                id="certificationDate"
                type="month"
                {...register("certificationDate", {
                  required: "Certification date is required",
                })}
              />
              {errors.certificationDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.certificationDate.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="certificationIssuer">Issuer Name</Label>
              <Input
                id="certificationIssuer"
                type="text"
                placeholder="e.g., Amazon Web Services"
                {...register("certificationIssuer", {
                  required: "Issuer name is required",
                })}
              />
              {errors.certificationIssuer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.certificationIssuer.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
              >
                Save Certification
              </Button>
            </div>
          </form>
        )}

        {/* Languages Form */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit(onSubmitLanguages)}>
            <div className="mb-4">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                type="text"
                placeholder="e.g., English"
                {...register("language", { required: "Language is required" })}
              />
              {errors.language && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="proficiency">Proficiency</Label>
              <Input
                id="proficiency"
                type="text"
                placeholder="e.g., Fluent, Intermediate, Basic"
                {...register("proficiency", {
                  required: "Proficiency is required",
                })}
              />
              {errors.proficiency && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.proficiency.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
              >
                Save Language
              </Button>
            </div>
          </form>
        )}

        {/* References Form */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit(onSubmitReferences)}>
            <div className="mb-4">
              <Label htmlFor="referenceName">Reference Name</Label>
              <Input
                id="referenceName"
                type="text"
                placeholder="e.g., John Doe"
                {...register("referenceName", {
                  required: "Reference name is required",
                })}
              />
              {errors.referenceName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.referenceName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="referenceContact">Reference Contact</Label>
              <Input
                id="referenceContact"
                type="text"
                placeholder="e.g., (123) 456-7890"
                {...register("referenceContact", {
                  required: "Reference contact is required",
                })}
              />
              {errors.referenceContact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.referenceContact.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="referenceRelationship">Relationship</Label>
              <Input
                id="referenceRelationship"
                type="text"
                placeholder="e.g., Former Manager"
                {...register("referenceRelationship", {
                  required: "Relationship is required",
                })}
              />
              {errors.referenceRelationship && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.referenceRelationship.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs cursor-pointer"
              >
                Save Reference
              </Button>
            </div>
          </form>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-xs cursor-pointer"
            >
              Previous
            </Button>
          )}

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

export default ResumeSections;
