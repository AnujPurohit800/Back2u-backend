import chatroomRepository from "../repositories/chatroomRepository.js";

export const createChatRoom = async ({ participants, post }) => {
    try {
      const existingChatroom = await chatroomRepository.findOne({
        participants: { $all: participants },
        post,
      });
      if (existingChatroom) {
        return existingChatroom;
      }
      const chatroom = await chatroomRepository.create({ participants, post });
      return chatroom;
    } catch (error) {
      console.log("Create chatroom service error", error);
      throw error;
    }
  };
  