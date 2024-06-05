import bcrypt from "bcrypt";
import Student from "../models/student.js";
import mongoose from "mongoose";
import Mentor from "../models/mentor.js";

export const studentSignUp = async (req, res) => {
  try {
    // Validate request body
    const {
      firstName,
      lastName,
      dob,
      gender,
      email,
      password,
      phoneNumber,
      semester,
      shift,
      program,
      mentorId,
    } = req.body;

    // Add your own validation logic based on your requirements
    if (
      !firstName ||
      !lastName ||
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

    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student instance
    const newStudent = new Student({
      firstName,
      lastName,
      dob,
      gender,
      email,
      password: hashedPassword,
      phoneNumber,
      semester,
      shift,
      program,
      mentorId,
    });

    // Save the new student to the database
    await newStudent.save();

    // You may also generate a JWT token here and send it back to the client for authentication

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error during student signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route for getting a single student by ID
export const getSingleStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    // Check if the student with the given ID exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // If the student is found, send it as a response
    res.status(200).json({ student });
  } catch (error) {
    console.error("Error getting student by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // Route for getting all students
// export const getAllStudents = async (req, res) => {
//   try {
//     // Find all students in the database
//     const students = await Student.find();

//     // If there are no students, respond with an appropriate message
//     if (!students || students.length === 0) {
//       return res.status(404).json({ message: "No students found" });
//     }

//     // If students are found, send them as a response
//     res.status(200).json({ students });
//   } catch (error) {
//     console.error("Error getting all students:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Route for updating a student by ID
export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const {
      firstName,
      lastName,
      dob,
      gender,
      email,
      password,
      phoneNumber,
      semester,
      shift,
      program,
      mentorId,
    } = req.body;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    // Check if the student with the given ID exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student fields
    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.dob = dob || student.dob;
    student.gender = gender || student.gender;
    student.email = email || student.email;
    student.phoneNumber = phoneNumber || student.phoneNumber;
    student.semester = semester || student.semester;
    student.shift = shift || student.shift;
    student.program = program || student.program;
    student.mentorId = mentorId || student.mentorId;

    // If a new password is provided, hash and update the password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    // Save the updated student to the database
    await student.save();

    // Optionally, you may generate a new JWT token and send it back to the client

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Route for deleting a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    // Check if the student with the given ID exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the student from the database
    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();

    if (!mentors || mentors.length === 0) {
      return res.status(404).json({ message: "No mentors found" });
    }

    // Do not include password in the response for security reasons
    const mentorsWithoutPassword = mentors.map((mentor) => {
      const { password, ...mentorWithoutPassword } = mentor.toObject();
      return mentorWithoutPassword;
    });

    res.status(200).json({ mentors: mentorsWithoutPassword });
  } catch (error) {
    console.error("Error getting all mentors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Request Mentors
export const requestMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not Found" });
    }

    if (student.mentorId) {
      return res.status(404).json({ message: "Student already has a mentor" });
    }

    const existingRequest = student.mentorRequests.find(
      (req) => req.mentorId.toString() === mentorId
    );

    if (existingRequest) {
      return res
        .status(404)
        .json({ message: "Request already sent to this mentor" });
    }

    student.mentorRequests.push({ mentorId, status: "pending" });
    await student.save();

    console.log("Request Mentor: Success");
    res
      .status(200)
      .json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    console.error("Request Mentor: Error", error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
