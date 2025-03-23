import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ResumeContext } from "../../context/resumeContext"; // ✅ Import ResumeContext
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SkillsSection = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useContext(ResumeContext); // ✅ Use ResumeContext
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Initialize state from context (ensures skills persist)
  const [skills, setSkills] = useState(resumeData.skills || []);

  // Handle form submission
  const onSubmit = (data) => {
    const updatedSkills = [...skills, data.skill];

    // ✅ Update local state
    setSkills(updatedSkills);

    // ✅ Update global resume context
    setResumeData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));

    reset(); // Reset form after submission
  };

  const handleNext = () => {
    navigate("/project");
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Skills</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Skill Input */}
          <div className="mb-4">
            <Label htmlFor="skill">Skill</Label>
            <Input
              id="skill"
              type="text"
              placeholder="e.g., JavaScript"
              {...register("skill", { required: "Skill is required" })}
            />
            {errors.skill && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skill.message}
              </p>
            )}
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

        {/* Display Added Skills */}
        {skills.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Your Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index} className="mb-4">
                  <span className="text-xl font-bold">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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

export default SkillsSection;
