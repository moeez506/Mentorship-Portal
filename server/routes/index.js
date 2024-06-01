import express from "express";
import studentRoutes from "./studentRoutes.js";
import mentorRoutes from "./mentorRoutes.js";
import roadmapRoute from "./roadmapRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/student", studentRoutes);
router.use("/mentor", mentorRoutes);
router.use("/roadmap", roadmapRoute);
router.use("/auth", authRoutes);

export default router;
