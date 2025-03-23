import React from "react";

const ProjectsPreview = ({ projects }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Projects Preview</h3>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{project.projectTitle}</h4>
              <p className="text-sm mb-2">{project.projectDescription}</p>
              {project.projectUrl && (
                <p>
                  <strong>Project URL: </strong>
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
                  <strong>Technologies Used:</strong> {project.technologiesUsed}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects added yet.</p>
      )}
    </div>
  );
};

export default ProjectsPreview;
