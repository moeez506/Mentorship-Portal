import express from "express";
import {
  logout,
  mentorLogin,
  studentLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/student-login").post(studentLogin);
router.route("/mentor-login").post(mentorLogin);
router.route("/logout").post(logout);

export default router;
