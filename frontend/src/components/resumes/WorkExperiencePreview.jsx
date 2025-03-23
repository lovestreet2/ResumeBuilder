import React from "react";

const WorkExperiencePreview = ({ experiences }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Work Experience Preview</h3>
      {experiences.length > 0 ? (
        <ul>
          {experiences.map((exp, index) => (
            <li key={index} className="mb-6 border-b pb-4">
              <h4 className="text-xl font-bold">
                {exp.jobTitle} - {exp.companyName}
              </h4>
              <p className="text-sm">Duration: {exp.workDuration}</p>
              {exp.jobDescription && (
                <p>
                  <strong>Job Description:</strong> {exp.jobDescription}
                </p>
              )}
              {exp.achievements && (
                <p>
                  <strong>Achievements:</strong> {exp.achievements}
                </p>
              )}
              {exp.skillsUsed && (
                <p>
                  <strong>Skills Used:</strong> {exp.skillsUsed}
                </p>
              )}
              {exp.technologiesUsed && (
                <p>
                  <strong>Technologies Used:</strong> {exp.technologiesUsed}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No work experience added yet.</p>
      )}
    </div>
  );
};

export default WorkExperiencePreview;
