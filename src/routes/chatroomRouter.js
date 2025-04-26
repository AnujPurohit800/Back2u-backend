import express from "express";

const router = express.Router();

import { isAuthenticated } from "../middleware/authMiddleware.js";
import { createChatRoomController } from "../controllers/chatroomController.js";

router.post("/",isAuthenticated, createChatRoomController);

export default router;
