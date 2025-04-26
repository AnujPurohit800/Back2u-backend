import express from "express";
import {
  getUserByIdController,
  signInController,
  signUpController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signin", signInController);
userRouter.post("/signup", signUpController);
userRouter.get("/:id", getUserByIdController);

export default userRouter;
