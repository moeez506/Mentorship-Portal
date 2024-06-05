import Notification from "../models/notification.js";
import express from "express";

const router = express.Router();

router.get("/notifications/:mentorId", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const notifications = await Notification.find({ mentorId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/notifications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
