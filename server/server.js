import "express-async-errors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFoundMiddleware } from "./middlewares/index.js";
import { connectDB } from "./config/db.js";
import routes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api", routes);
app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected");
    app.listen(port, () => console.log(`Server is up and running on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
