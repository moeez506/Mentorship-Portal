import { StatusCodes } from "http-status-codes";
import CustomApiErrorHandler from "../utils/CustomApiErrorHandler.js";
import jwt from "jsonwebtoken";

export const authenticatedUser = async (req, _, next) => {
  const authHeader = req.headers.authorization;
  console.log("🚀 ~ file: auth.ts:12 ~ authHeader:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomApiErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];
  try {
    const { id, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ file: auth.ts:27 ~ id:", id);
    console.log("🚀 ~ file: auth.ts:18 ~ payload:", isAdmin);
    req.user = { id, isAdmin };
    next();
  } catch (error) {
    throw new CustomApiErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
};
