import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Label, Input, TextArea } from "../ui"; // Assuming you have these components
import { jsPDF } from "jspdf"; // For PDF download

const ResumePreview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState({});

  // Handle form submission for each section
  const onSubmitCertifications = (data) => {
    setCertifications([...certifications, data]);
    reset();
  };

  const onSubmitLanguages = (data) => {
    setLanguages([...languages, data]);
    reset();
  };

  const onSubmitReferences = (data) => {
    setReferences([...references, data]);
    reset();
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleResumePreview = () => {
    setResumeData({
      certifications,
      languages,
      references,
    });
    setCurrentStep(4); // Jump to Preview step
  };

  const handleSubmitResume = () => {
    alert("Your resume has been submitted!");
    // Here you can implement the logic to submit the data to an API
  };

  const handleDownloadResume = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Adding Personal Information (You can customize this with actual fields)
    doc.text("Resume", 20, 10);
    doc.text("Certifications", 20, 20);
    certifications.forEach((cert, index) => {
      doc.text(
        `${index + 1}. ${cert.certificationName} - ${
          cert.certificationIssuer
        } (${cert.certificationDate})`,
        20,
        30 + index * 10
      );
    });

    doc.text("Languages", 20, 50 + certifications.length * 10);
    languages.forEach((lang, index) => {
      doc.text(
        `${index + 1}. ${lang.language} - ${lang.proficiency}`,
        20,
        60 + index * 10 + certifications.length * 10
      );
    });

    doc.text(
      "References",
      20,
      80 + languages.length * 10 + certifications.length * 10
    );
    references.forEach((ref, index) => {
      doc.text(
        `${index + 1}. ${ref.referenceName} - ${ref.referenceRelationship} (${
          ref.referenceContact
        })`,
        20,
        90 + index * 10 + languages.length * 10 + certifications.length * 10
      );
    });

    doc.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Resume Preview
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
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
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
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
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
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
              >
                Save Reference
              </Button>
            </div>
          </form>
        )}

        {/* Preview and navigation */}
        {currentStep === 4 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Your Resume Preview</h3>

            <div className="mb-4">
              <h4 className="text-xl font-bold">Certifications</h4>
              {certifications.length === 0 ? (
                <p>No certifications added.</p>
              ) : (
                <ul>
                  {certifications.map((cert, index) => (
                    <li key={index}>
                      <strong>{cert.certificationName}</strong> -{" "}
                      {cert.certificationIssuer} ({cert.certificationDate})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-bold">Languages</h4>
              {languages.length === 0 ? (
                <p>No languages added.</p>
              ) : (
                <ul>
                  {languages.map((lang, index) => (
                    <li key={index}>
                      <strong>{lang.language}</strong> - {lang.proficiency}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-xl font-bold">References</h4>
              {references.length === 0 ? (
                <p>No references added.</p>
              ) : (
                <ul>
                  {references.map((ref, index) => (
                    <li key={index}>
                      <strong>{ref.referenceName}</strong> -{" "}
                      {ref.referenceRelationship} ({ref.referenceContact})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handleSubmitResume}
                className="bg-green-600 hover:bg-green-700 text-white w-full max-w-xs"
              >
                Submit Resume
              </Button>

              <Button
                onClick={handleDownloadResume}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
              >
                Download Resume
              </Button>

              <Button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-xs"
              >
                Update
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-600 hover:bg-gray-700 text-white w-full max-w-xs"
            >
              Previous
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
