import mongoose from "mongoose";

// Mentor Schema
const MentorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // Assuming experience is a numeric value
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  semester: {
    type: Number, // Assuming semester is a numeric value
    required: true,
  },
  phoneNumber: {
    type: String, // You might want to validate or format this further based on your requirements
  },
  shift: {
    type: String,
    enum: ["morning", "evening"],
    required: true,
  },
  program: {
    type: String, // You might want to use a predefined list of programs or validate this further
    required: true,
  },
  mentees: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
});

// export the Mentor model
export default mongoose.model("Mentor", MentorSchema);
