import { StatusCodes } from "http-status-codes";
import { createChatRoom } from "../services/chatroomService.js";

export const createChatRoomController = async (req, res) => {
    try {
      const { otherUserId, post } = req.body;
      const currentUserId = req.user;
      const participants = [currentUserId, otherUserId];
  
      const chatroom = await createChatRoom({ participants, post });
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Chatroom created successfully",
        data: chatroom,
      });
    } catch (error) {
      console.log("Create chatroom controller error", error);
      if (error.status) {
        return res.status(error.status).json({
          success: false,
          message: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  