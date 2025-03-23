import React from "react";

const SkillsPreview = ({ skills }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Skills Preview</h3>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="mb-2 text-lg">
              <span className="font-semibold">{skill}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No skills added yet.</p>
      )}
    </div>
  );
};

export default SkillsPreview;
