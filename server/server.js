import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { errorHandler, notFoundMiddleware } from "./middlewares/index.js";
import routes from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/message.js";
// import Student from "../models/student.js";
// import Mentor from "./models/Mentor.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api", routes);
// app.use(notFoundMiddleware);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    const message = new Message({
      sender: {
        id: sender.id,
        role: sender.role,
      },
      receiver: {
        id: receiver.id,
        role: receiver.role,
      },
      content,
    });
    await message.save();
    io.emit("message", { sender, receiver, content });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected");
    server.listen(port, () =>
      console.log(`Server is up and running on ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
