import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ResumeContext } from "@/context/resumeContext.jsx";

// Reusable Section Component
const Section = ({ title, children }) =>
  children && children.length > 0 ? (
    <section className="mb-6">
      <h3 className="text-xl font-semibold border-b pb-2">{title}</h3>
      {children}
    </section>
  ) : null;

const FinalResumePreview = () => {
  const { resumeData } = useContext(ResumeContext);
  const resumeRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "Resume",
  });

  // Check if resumeData exists and has necessary content
  if (!resumeData || Object.keys(resumeData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
        <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-center mb-6">
            No Resume Data Available
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Final Resume Preview
        </h2>

        {/* Resume Content */}
        <div ref={resumeRef} className="p-6 border rounded-lg">
          {/* Personal Details */}
          {resumeData.personalDetails &&
            object.keys(resumeData.personalDetails).length > 0 && (
              <Section title="Personal Details">
                <p>
                  <strong>Name:</strong>{" "}
                  {resumeData.personalDetails.firstname &&
                  resumeData.personalDetails.lastname
                    ? `${resumeData.personalDetails.firstname} ${resumeData.personalDetails.lastname}`
                    : "N/A"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {resumeData.personalDetails.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {resumeData.personalDetails.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {resumeData.personalDetails.address || "N/A"}
                </p>
              </Section>
            )}

          {/* Education */}
          <Section title="Education">
            {Array.isArray(resumeData.education) &&
            resumeData.education.length > 0 ? (
              resumeData.education.map((edu, index) => (
                <p key={index}>
                  <strong>{edu.school || "N/A"}</strong> - {edu.degree || "N/A"}{" "}
                  ({edu.year || "N/A"})
                </p>
              ))
            ) : (
              <p>No education details available</p>
            )}
          </Section>

          {/* Work Experience */}
          <Section title="Work Experience">
            {Array.isArray(resumeData.workExperience) &&
            resumeData.workExperience.length > 0 ? (
              resumeData.workExperience.map((job, index) => (
                <p key={index}>
                  <strong>{job.company || "N/A"}</strong> -{" "}
                  {job.position || "N/A"} ({job.duration || "N/A"})
                </p>
              ))
            ) : (
              <p>No work experience Available.</p>
            )}
          </Section>

          {/* Skills */}
          <Section title="Skills">
            {Array.isArray(resumeData.skills) &&
            resumeData.skills.length > 0 ? (
              <ul className="list-disc ml-6">
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills available.</p>
            )}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {Array.isArray(resumeData.projects) &&
            resumeData.projects.length > 0 ? (
              resumeData.projects.map((project, index) => (
                <p key={index}>
                  <strong>{project.name || "N/A"}</strong> -{" "}
                  {project.description || "N/A"}
                </p>
              ))
            ) : (
              <p>No projects details available.</p>
            )}
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            {Array.isArray(resumeData.certifications) &&
            resumeData.certifications.length > 0 ? (
              resumeData.certifications.map((cert, index) => (
                <p key={index}>
                  <strong>{cert.certificationName || "N/A"}</strong> -{" "}
                  {cert.certificationIssuer || "N/A"}
                </p>
              ))
            ) : (
              <p>No certifications Available.</p>
            )}
          </Section>

          {/* Languages */}
          <Section title="Languages">
            {Array.isArray(resumeData.languages) &&
            resumeData.languages.length > 0 ? (
              resumeData.languages.map((lang, index) => (
                <p key={index}>
                  <strong>{lang.language || "N/A"}</strong> -{" "}
                  {lang.proficiency || "N/A"}
                </p>
              ))
            ) : (
              <p>No languages available.</p>
            )}
          </Section>

          {/* References */}
          <Section title="References">
            {Array.isArray(resumeData.references) &&
            resumeData.references.length > 0 ? (
              resumeData.references.map((ref, index) => (
                <p key={index}>
                  <strong>{ref.referenceName || "N/A"}</strong> -{" "}
                  {ref.referenceRelationship || "N/A"}
                </p>
              ))
            ) : (
              <p>No references available.</p>
            )}
          </Section>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col items-center">
          <Button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full max-w-xs mb-4 cursor-pointer"
          >
            Download PDF
          </Button>

          <div className="flex justify-between w-full max-w-xs">
            <Button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white w-full mr-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Edit
            </Button>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full ml-2 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalResumePreview;
