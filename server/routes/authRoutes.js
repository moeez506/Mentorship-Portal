import express from "express";
import {
  getUser,
  logout,
  mentorLogin,
  studentLogin,
} from "../controllers/authController.js";
import { authenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/student-login").post(studentLogin);
router.route("/mentor-login").post(mentorLogin);
router.route("/logout").get(authenticatedUser, logout);
router.route('/get-user').get(authenticatedUser, getUser);

export default router;
