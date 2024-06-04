import mongoose from "mongoose";

// Student Schema
const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  phoneNumber: {
    type: String, // You might want to validate or format this further based on your requirements
  },
  semester: {
    type: Number, // Assuming semester is a numeric value
    required: true,
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
  role: {
    type: String,
    required: true,
    default: "student",
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming mentorId is a reference to another MongoDB document
    ref: "Mentor",
  },
  mentorRequests: [
    {
      mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],
});

// export the Student model
export default mongoose.model("Student", StudentSchema);
