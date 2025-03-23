import { Schema, model } from "mongoose";

const ResumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  experience: [
    {
      position: String,
      company: String,
      duration: String,
    },
  ],
  skills: [String],
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
});

export default model("Resume", ResumeSchema);
