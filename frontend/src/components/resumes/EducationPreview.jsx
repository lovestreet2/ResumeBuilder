import React from "react";

const EducationPreview = ({ educationList }) => {
  // Sort education list by step to display the order (10th, 12th, Graduation)
  const sortedEducationList = [...educationList].sort(
    (a, b) => a.step - b.step
  );

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Resume Preview</h3>
      {sortedEducationList.length > 0 ? (
        sortedEducationList.map((education, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-semibold">{education.degree}</h4>
            <p className="text-gray-700">
              {education.schoolName} ({education.graduationYear})
            </p>
            <p className="text-gray-500">Grade/CGPA: {education.grade}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No education details added yet.</p>
      )}
    </div>
  );
};

export default EducationPreview;
