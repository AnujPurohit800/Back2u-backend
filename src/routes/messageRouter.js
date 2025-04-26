import express from "express";
import { createMessageController, getMessagesByChatroomIdController } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",isAuthenticated,createMessageController);
router.get("/:chatroomId", getMessagesByChatroomIdController);

export default router;
