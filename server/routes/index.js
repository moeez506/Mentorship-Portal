import express from "express";
import studentRoutes from "./studentRoutes.js";
import mentorRoutes from "./mentorRoutes.js";
import roadmapRoute from "./roadmapRoutes.js";
import authRoutes from "./authRoutes.js";
import chatRoutes from "./chat.js";
import notiRoutes from "./notification.js";

const router = express.Router();

router.use("/student", studentRoutes);
router.use("/mentor", mentorRoutes);
router.use("/roadmap", roadmapRoute);
router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/noti", notiRoutes);

export default router;
