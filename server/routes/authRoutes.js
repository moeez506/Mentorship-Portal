import express from "express";
import { mentorLogin, studentLogin } from "../controllers/authController.js";

const router = express.Router();

router.route("/student-login").post(studentLogin);
router.route("/mentor-login").post(mentorLogin);

export default router;
