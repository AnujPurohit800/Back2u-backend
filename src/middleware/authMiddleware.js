import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers["x-access-header"];
  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ success: false, message: "token is required" });
  }
  try {
    const response = verifyToken(token);
    req.user = response._id;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
  next();
};

