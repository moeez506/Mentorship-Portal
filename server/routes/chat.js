import express from "express";
import Message from "../models/message.js";

const router = express.Router();

router.get("/history/:userId1/:userId2", async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    // Find messages between userId1 and userId2, sorted by timestamp
    const messages = await Message.find({
      $or: [
        { "sender.id": userId1, "receiver.id": userId2 },
        { "sender.id": userId2, "receiver.id": userId1 },
      ],
    }).sort("timestamp");

    res.json(messages);
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
