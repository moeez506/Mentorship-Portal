import express from "express";
import {
  addMentee,
  deleteMentor,
  getAllRequests,
  getAllStudents,
  getAllStudentsOfMentor,
  getSingleMentor,
  handleRequest,
  mentorSignUp,
  updateMentor,
} from "../controllers/mentorController.js";
import { authenticatedUser, isVerified } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(mentorSignUp);
router.route("/all-students").get(authenticatedUser, isVerified, getAllStudents);
router.route("/students-request").get(authenticatedUser, isVerified, getAllRequests);
router.route("/handle-request").patch(authenticatedUser, isVerified, handleRequest);
router.route("/add-mentee").post(authenticatedUser, isVerified, addMentee);
// router.route("/decline-request").patch(declineRequest);
router.route("/all-mentees").get(authenticatedUser, isVerified, getAllStudentsOfMentor);
router.route("/:id").get(getSingleMentor);
// router.route("/").get(getAllMentors);
router.route("/update/:id").put(authenticatedUser, isVerified, updateMentor);
router.route("/delete/:id").delete(authenticatedUser, isVerified, deleteMentor);

export default router;
