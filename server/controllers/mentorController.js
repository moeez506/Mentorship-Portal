import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Mentor from "../models/mentor.js";
import Student from "../models/student.js";

export const mentorSignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      experience,
      company,
      dob,
      gender,
      email,
      password,
      semester,
      phoneNumber,
      shift,
      program,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !experience ||
      !company ||
      !dob ||
      !gender ||
      !email ||
      !password ||
      !semester ||
      !shift ||
      !program
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMentor = new Mentor({
      firstName,
      lastName,
      experience,
      company,
      dob,
      gender,
      email,
      password: hashedPassword,
      semester,
      phoneNumber,
      shift,
      program,
    });

    await newMentor.save();

    res.status(201).json({ message: "Mentor registered successfully" });
  } catch (error) {
    console.error("Error during mentor creation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSingleMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor ID" });
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Do not include password in the response for security reasons
    const { password, ...mentorWithoutPassword } = mentor.toObject();

    res.status(200).json({ mentor: mentorWithoutPassword });
  } catch (error) {
    console.error("Error getting mentor by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getAllMentors = async (req, res) => {
//   try {
//     const mentors = await Mentor.find();

//     if (!mentors || mentors.length === 0) {
//       return res.status(404).json({ message: "No mentors found" });
//     }

//     // Do not include password in the response for security reasons
//     const mentorsWithoutPassword = mentors.map((mentor) => {
//       const { password, ...mentorWithoutPassword } = mentor.toObject();
//       return mentorWithoutPassword;
//     });

//     res.status(200).json({ mentors: mentorsWithoutPassword });
//   } catch (error) {
//     console.error("Error getting all mentors:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Route for getting all students
export const getAllStudents = async (req, res) => {
  try {
    // Find all students in the database
    const students = await Student.find();

    // If there are no students, respond with an appropriate message
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // If students are found, send them as a response
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error getting all students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const {
      firstName,
      lastName,
      experience,
      company,
      dob,
      gender,
      email,
      password,
      semester,
      phoneNumber,
      shift,
      program,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor ID" });
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    mentor.firstName = firstName || mentor.firstName;
    mentor.lastName = lastName || mentor.lastName;
    mentor.experience = experience || mentor.experience;
    mentor.company = company || mentor.company;
    mentor.dob = dob || mentor.dob;
    mentor.gender = gender || mentor.gender;
    mentor.email = email || mentor.email;
    mentor.semester = semester || mentor.semester;
    mentor.phoneNumber = phoneNumber || mentor.phoneNumber;
    mentor.shift = shift || mentor.shift;
    mentor.program = program || mentor.program;

    // If a new password is provided, hash and update the password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      mentor.password = hashedPassword;
    }

    await mentor.save();

    // Do not include password in the response for security reasons
    const { password: removedPassword, ...updatedMentorWithoutPassword } =
      mentor.toObject();

    res.status(200).json({
      message: "Mentor updated successfully",
      mentor: updatedMentorWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentor ID" });
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    await mentor.deleteOne();

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Students Requests
export const getAllRequests = async (req, res) => {
  try {
    const { mentorId } = req.body;

    if (!mentorId) {
      res.status(400).json({
        success: false,
        message: "MentorId is required in the request body",
      });
      return; // Optional: You can use return here to stop further execution
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      res.status(404).json({ success: false, message: "Mentor not found" });
      return; // Optional: You can use return here to stop further execution
    }

    // Assuming you have a reference to students in the Mentor model
    const studentRequests = await Student.find({
      "mentorRequests.mentorId": mentorId,
    }).populate("mentorRequests.mentorId");

    res.status(200).json({ success: true, requests: studentRequests });
  } catch (error) {
    console.error("Error getting all requests:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Mentor handle request (accept or decline)
export const handleRequest = async (req, res) => {
  try {
    const { mentorId, studentId, action } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }

    const request = student.mentorRequests.find(
      (req) => req.mentorId.toString() === mentorId
    );

    if (!request) {
      res.status(404).json({ success: false, message: "Request not found" });
      return;
    }

    // Check if the request has already been handled
    if (request.status === "accepted" || request.status === "rejected") {
      res.status(400).json({
        success: false,
        message: "Request has already been handled",
      });
      return;
    }

    // Update the request status based on the action
    if (action === "accept") {
      request.status = "accepted";

      // Set the mentorId in the student schema
      student.mentorId = mentorId;

      // Add the student to the mentor's mentees array
      const mentor = await Mentor.findById(mentorId);
      mentor.mentees.push({ studentId });
      await mentor.save();
    } else if (action === "decline") {
      request.status = "rejected";
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid action. Use 'accept' or 'decline'",
      });
      return;
    }

    await student.save();

    res
      .status(200)
      .json({ success: true, message: "Request handled successfully" });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all students of a mentor
export const getAllStudentsOfMentor = async (req, res) => {
  try {
    const { mentorId } = req.body;

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      res.status(404).json({ success: false, message: "Mentor not found" });
      return;
    }

    const studentIds = mentor.mentees.map((mentee) => mentee.studentId);

    // Fetch details of students using the studentIds
    const students = await Student.find({ _id: { $in: studentIds } });

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Error getting all students of mentor:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
