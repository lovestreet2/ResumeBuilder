import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ResumeContext } from "../../context/resumeContext"; // ✅ Import ResumeContext
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useContext(ResumeContext); // ✅ Use ResumeContext
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Initialize state from context (ensures projects persist)
  const [projects, setProjects] = useState(resumeData.projects || []);

  // Handle form submission
  const onSubmit = (data) => {
    const updatedProjects = [...projects, data];

    // ✅ Update local state
    setProjects(updatedProjects);

    // ✅ Update global resume context
    setResumeData((prevData) => ({
      ...prevData,
      projects: updatedProjects,
    }));

    reset(); // Reset form after submission
  };

  const handleNext = () => {
    navigate("/resumes");
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Projects</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Project Title Input */}
          <div className="mb-4">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              type="text"
              placeholder="e.g., Personal Portfolio"
              {...register("projectTitle", {
                required: "Project title is required",
              })}
            />
            {errors.projectTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectTitle.message}
              </p>
            )}
          </div>

          {/* Project Description Input */}
          <div className="mb-4">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea
              id="projectDescription"
              placeholder="Describe your project"
              {...register("projectDescription", {
                required: "Project description is required",
              })}
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectDescription.message}
              </p>
            )}
          </div>

          {/* Project URL Input */}
          <div className="mb-4">
            <Label htmlFor="projectUrl">Project URL</Label>
            <Input
              id="projectUrl"
              type="url"
              placeholder="e.g., https://github.com/your-project"
              {...register("projectUrl")}
            />
          </div>

          {/* Technologies Used Input */}
          <div className="mb-4">
            <Label htmlFor="technologiesUsed">Technologies Used</Label>
            <Textarea
              id="technologiesUsed"
              placeholder="List the technologies used"
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

        {/* Display Added Projects */}
        {projects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Your Projects</h3>
            <ul>
              {projects.map((project, index) => (
                <li key={index} className="mb-4 border-b pb-2">
                  <h4 className="text-xl font-bold">{project.projectTitle}</h4>
                  <p className="text-sm">{project.projectDescription}</p>
                  {project.projectUrl && (
                    <p>
                      <strong>URL:</strong>{" "}
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {project.projectUrl}
                      </a>
                    </p>
                  )}
                  {project.technologiesUsed && (
                    <p>
                      <strong>Technologies Used:</strong>{" "}
                      {project.technologiesUsed}
                    </p>
                  )}
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

export default ProjectsSection;
