import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
