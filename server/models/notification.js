import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "Mentor",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
