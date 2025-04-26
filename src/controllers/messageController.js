import { StatusCodes } from "http-status-codes";
import { createMessageService, getMessagesByChatRoomIdService } from "../services/messageService.js";

export const createMessageController = async (req, res) => {
  try {
    const { chatroom, message } = req.body;
    const newMessage = await createMessageService({
      chatroom,
      sender: req.user,
      message,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log("Create message controller error", error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessagesByChatroomIdController = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const messages = await getMessagesByChatRoomIdService(chatroomId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    console.log("Get messages by chatroom ID controller error", error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};