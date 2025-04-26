import express from "express";
import userRouter from "./userRoutes.js";
import postRouter from "./postRouter.js";
import chatroomRouter from "./chatroomRouter.js";
import messageRouter from "./messageRouter.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/chatrooms", chatroomRouter);
router.use("/messages", messageRouter );
export default router;
