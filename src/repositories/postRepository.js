import { get } from "mongoose";
import Post from "../schema/post.js";
import crudRepository from "./crudRepository.js";

const postRepository = {
  ...crudRepository(Post),
  getPaginatedPosts: async function (page, limit) {
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email avatar");
    return posts;
  },
  getPostCount: async function () {
    const count = await Post.countDocuments();
    return count;
  },
  getPostByIdDetails: async function (id) {
    const post = await Post.findById(id).populate("postedBy", "name email");
    return post;
  },
  getPostsByType: async function (type) {
    const post = await Post.find({ type }).populate("postedBy", "name email");
    return post;
  },
  getPostsByUserId: async function (userId) {
    const post = await Post.find({ postedBy: userId }).populate(
      "postedBy",
      "name email"
    );
    return post;
  },
};

export default postRepository;
