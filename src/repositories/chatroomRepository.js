import ChatRoom from "../schema/chatroom.js";
import crudRepository from "./crudRepository.js";

const chatroomRepository = {
  ...crudRepository(ChatRoom),
  getByUserId: async function (userId) {
    const chatroom = await ChatRoom.find({ userId }).populate(
      "userId",
      "name email avatar"
    );
    return chatroom;
  },
  findOne: async function (query) {
    const chatroom = await ChatRoom.findOne(query).populate(
      "participants",
      "name email avatar"
    );
    return chatroom;
  },
};
export default chatroomRepository;
