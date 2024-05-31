import express from "express";
import {
  studentSignUp,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  getAllMentors,
  requestMentor,
} from "../controllers/studentController.js";

const router = express.Router();

router.route("/register").post(studentSignUp);
router.route("/request-mentor").post(requestMentor);
router.route("/all-mentors").get(getAllMentors);
router.route("/:id").get(getSingleStudent);
// router.route("/").get(getAllStudents);
router.route("/update/:id").put(updateStudent);
router.route("/delete/:id").delete(deleteStudent);

export default router;
