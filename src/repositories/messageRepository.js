import Message from "../schema/message.js";
import crudRepository from "./crudRepository.js";

const messageRepository = {
  ...crudRepository(Message),
  getMessagesByChatRoomId: async function (chatRoomId) {
    const messages = await Message.find({chatroom: chatRoomId })
      .populate("sender", "name email avatar")
      .populate("chatroom", "participants")
      .populate("chatroom.participants", "name email avatar")
      .sort({ createdAt: -1 });
    return messages;
  },
  createMesasage: async function (message) {
    const newMessage = await Message.create(message);
    return newMessage;
  },
};

export default messageRepository;
