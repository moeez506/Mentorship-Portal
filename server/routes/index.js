import express from "express";
import studentRoutes from "./studentRoutes.js";
import mentorRoutes from "./mentorRoutes.js";import roadmapRoute from "./roadmapRoutes.js";


const router = express.Router();

router.use("/student", studentRoutes);
router.use("/mentor", mentorRoutes);
router.use("/roadmap", roadmapRoute);

export default router;
