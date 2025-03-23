import React from "react";

const PersonalPreview = ({ personalData }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Personal Details Preview</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        {/* Display Profile Picture */}
        {personalData.image && (
          <div className="text-center mb-4">
            <img
              src={personalData.image}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
        )}

        {/* Display Name */}
        <div className="mb-2">
          <strong className="text-lg">Name: </strong>
          {personalData.firstName} {personalData.lastName}
        </div>

        {/* Display Email */}
        <div className="mb-2">
          <strong className="text-lg">Email: </strong>
          {personalData.email}
        </div>

        {/* Display Phone */}
        <div className="mb-2">
          <strong className="text-lg">Phone: </strong>
          {personalData.phone}
        </div>

        {/* Display Address */}
        <div className="mb-2">
          <strong className="text-lg">Address: </strong>
          {personalData.address}
        </div>
      </div>
    </div>
  );
};

export default PersonalPreview;
