import { useFieldArray, useForm } from "react-hook-form";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

const ResumeForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    if (onSubmit) onSubmit(data);
  };

  const educationFields = [
    { name: "degree", label: "Degree", required: true },
    { name: "university", label: "University", required: true },
  ];

  const workExperienceFields = [
    { name: "jobTitle", label: "Job Title", required: true },
    { name: "company", label: "Company", required: true },
    { name: "years", label: "Years Worked", required: true },
  ];

  const skillFields = [
    { name: "skill1", label: "Skill 1", required: true },
    { name: "skill2", label: "Skill 2", required: false },
  ];

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-8 bg-gray-50 rounded-xl"
    >
      {/* Personal Details Section */}
      <fieldset className="flex items-center justify-center space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <legend className="block max-auto text-2xl font-bold text-gray-800 text-center px-4">
          Personal Details
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Full Name*",
              name: "personalDetails.name",
              required: true,
              type: "text",
            },
            {
              label: "Email*",
              name: "personalDetails.email",
              required: true,
              type: "email",
            },
            { label: "Phone", name: "personalDetails.phone", type: "tel" },
            { label: "Address", name: "personalDetails.address", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                {...register(field.name, { required: field.required })}
                className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                           transition-all duration-200"
                aria-invalid={
                  errors.personalDetails?.[field.name.split(".")[2]]
                    ? "true"
                    : "false"
                }
              />
              {errors.personalDetails?.[field.name.split(".")[2]] && (
                <p className="mt-2 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>
          ))}
        </div>
      </fieldset>

      {/* Education Section */}
      <fieldset className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <legend className="block max-auto text-center text-2xl font-bold text-gray-800 px-4">
          Education
        </legend>

        {educationFields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-6 border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Institution*", name: "institution", required: true },
                { label: "Degree*", name: "degree", required: true },
              ].map((fieldConfig) => (
                <div key={fieldConfig.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fieldConfig.label}
                  </label>
                  <input
                    {...register(`education.${index}.${fieldConfig.name}`, {
                      required: fieldConfig.required,
                    })}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {errors.education?.[index]?.[fieldConfig.name] && (
                    <p className="mt-2 text-sm text-red-600">
                      This field is required
                    </p>
                  )}
                </div>
              ))}

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register(`education.${index}.startDate`)}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register(`education.${index}.endDate`)}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {index > 0 && (
              <Button
                type="button"
                onClick={() => removeEducation(index)}
                className="flex items-center bg-gradient-to-r from-red-600 to-red-500 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <TrashIcon className="w-5 h-5 mr-1.5" />
                Remove Education
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendEducation({
              institution: "",
              degree: "",
              startDate: "",
              endDate: "",
            })
          }
          className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 bg-gradient-to-r 
                     from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 
                     hover:to-blue-600 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Education
        </Button>
      </fieldset>

      {/* Work Experience Section */}
      <fieldset className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <legend className="block max-auto text-center text-2xl font-bold text-gray-800 px-4">
          Work Experience
        </legend>

        {workExperienceFields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-6 border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Company*", name: "company", required: true },
                { label: "Position*", name: "position", required: true },
              ].map((fieldConfig) => (
                <div key={fieldConfig.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {fieldConfig.label}
                  </label>
                  <input
                    {...register(
                      `workExperience.${index}.${fieldConfig.name}`,
                      {
                        required: fieldConfig.required,
                      }
                    )}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {errors.workExperience?.[index]?.[fieldConfig.name] && (
                    <p className="mt-2 text-sm text-red-600">
                      This field is required
                    </p>
                  )}
                </div>
              ))}

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.startDate`)}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.endDate`)}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register(`workExperience.${index}.description`)}
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  rows={3}
                />
              </div>
            </div>

            {index > 0 && (
              <Button
                type="button"
                onClick={() => removeWorkExperience(index)}
                className="flex items-center text-red-600 bg-red-500 hover:text-red-700 hover:bg-red-600 text-sm font-medium p-2 rounded transition-colors duration-200 bg-gradient-to-r from-red-600 to-red-500"
              >
                <TrashIcon className="w-5 h-5 mr-1.5" />
                Remove Experience
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            appendWorkExperience({
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 bg-gradient-to-r 
                     from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 
                     hover:to-blue-600 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Work Experience
        </Button>
      </fieldset>

      {/* Skills Section */}
      <fieldset className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <legend className="block max-auto text-center text-2xl font-bold text-gray-800 px-4">
          Skills
        </legend>

        <div className="space-y-4">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <input
                {...register(`skills.${index}.value`)}
                className="flex-1 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Skill"
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="p-2 text-red-500 bg-gradient-to-r from-red-600 to-red-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => appendSkill({ value: "" })}
          className="w-full md:w-auto flex items-center justify-center px-6 py-2.5 bg-gradient-to-r 
                     from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 
                     hover:to-blue-600 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Skill
        </Button>
      </fieldset>

      <Button
        type="submit"
        className="w-full flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg 
    hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Generate Resume
      </Button>
    </form>
  );
};

export default ResumeForm;
