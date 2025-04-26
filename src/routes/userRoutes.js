import express from "express";
import {
  signInController,
  signUpController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signin", signInController);
userRouter.post("/signup", signUpController);

export default userRouter;
