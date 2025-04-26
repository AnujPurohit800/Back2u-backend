import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    aiTags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedToAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["claimed", "active", "resolved", "underReview"],
      default: "active",
    },
    approvedClaimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
