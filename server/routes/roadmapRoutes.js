import { Router } from "express";
import {
    assignRoadmapToStudent,
    createRoadmap,
    createTask,
    deleteRoadmap,
    deleteTask,
    getAllRoadmaps,
    getMentorRoadmaps,
    getRoadmap,
    getStudentRoadmap,
    updateRoadmap,
    updateTask,
} from "../controllers/roadmapController.js";

const router = Router();

// Define your routes here
router.get("/", getAllRoadmaps);
router.post("/create", createRoadmap);
router.get("/:id", getRoadmap);
router.patch("/:id", updateRoadmap);
router.delete("/:id", deleteRoadmap);

router.post("/assign", assignRoadmapToStudent);
router.get("/get-mentor-roadmaps/:id", getMentorRoadmaps);
router.get("/get-student-roadmaps/:id", getStudentRoadmap);

// routes for task

router.post("/task/create", createTask);
router.patch("/task/update", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
