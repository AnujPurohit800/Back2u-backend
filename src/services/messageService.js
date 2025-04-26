import messageRepository from "../repositories/messageRepository.js";

export const createMessageService = async (message) => {
  try {
    const newMessage = await messageRepository.create(message);
    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export const getMessagesByChatRoomIdService = async (chatRoomId) => {
  try {
    const messages = await messageRepository.getMessagesByChatRoomId(chatRoomId);
    return messages;
  } catch (error) {
    console.error("Error fetching messages by chat room ID:", error);
    throw error;
  }
};