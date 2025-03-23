import Resume from "../models/Resume.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const { userId, name, experience, skills, education } = req.body;
    const newResume = new Resume({
      userId,
      name,
      experience,
      skills,
      education,
    });

    const resume = await newResume.save();
    res.status(201).json(resume); // Send the created resume back as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all resumes for a user
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId });
    res.status(200).json(resumes); // Return the list of resumes for the given user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a specific resume
export const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedResume); // Return the updated resume
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
