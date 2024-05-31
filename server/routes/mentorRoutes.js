import express from "express";
import {
  // acceptRequest,
  // declineRequest,
  deleteMentor,
  getAllRequests,
  getAllStudents,
  getAllStudentsOfMentor,
  getSingleMentor,
  handleRequest,
  mentorSignUp,
  updateMentor,
} from "../controllers/mentorController.js";

const router = express.Router();

router.route("/register").post(mentorSignUp);
router.route("/all-students").get(getAllStudents);
router.route("/students-request").get(getAllRequests);
router.route("/handle-request").patch(handleRequest);
// router.route("/decline-request").patch(declineRequest);
router.route("/all-mentees").get(getAllStudentsOfMentor);
router.route("/:id").get(getSingleMentor);
// router.route("/").get(getAllMentors);
router.route("/update/:id").put(updateMentor);
router.route("/delete/:id").delete(deleteMentor);

export default router;
