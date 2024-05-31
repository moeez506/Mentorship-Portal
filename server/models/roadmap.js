import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

// Define the roadmap schema
const roadmapSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 500,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "Mentor",
    required: true,
  },
  tasks: [taskSchema],
});

const Roadmap = model("Roadmap", roadmapSchema);
export default Roadmap;
