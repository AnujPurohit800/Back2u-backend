import { StatusCodes } from "http-status-codes";
import postRepository from "../repositories/postRepository.js";

export const createPostService = async (data) => {
  try {
    const post = await postRepository.create(data);
    return post;
  } catch (error) {
    console.log("Create post service error", error);
    throw error;
  }
};

export const getPaginatedPostsService = async (page, limit) => {
  try {
    const posts = await postRepository.getPaginatedPosts(page, limit);
    const totalPosts = await postRepository.getPostCount();
    const totalPages = Math.ceil(totalPosts / limit);
    return {
      posts,
      totalPosts,
      totalPages,
    };
  } catch (error) {
    console.log("Get paginated posts service error", error);
    throw error;
  }
};

export const getPostByIdService = async (id) => {
  try {
    const post = await postRepository.getPostByIdDetails(id);
    return post;
  } catch (error) {
    console.log("Get post by ID details service error", error);
    throw error;
  }
};

export const deletePostService = async (id, userId) => {
  try {
    const post = await postRepository.getById(id);
    if (!post) {
      throw { status: StatusCodes.NOT_FOUND, message: "Post not found" };
    }
    if (post.postedBy.toString() !== userId) {
      throw { status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" };
    }
    const deletedPost = await postRepository.delete(id);
    if (!deletedPost) {
      throw {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Failed to delete post",
      };
    }
    return deletedPost;
  } catch (error) {
    console.log("Delete post service error", error);
    throw error;
  }
};

export const updatePostService = async (id, userId, data) => {
  try {
    const response = await postRepository.update(id, data);
    const post = await postRepository.getById(id);
    if (!post) {
      throw { status: StatusCodes.NOT_FOUND, message: "Post not found" };
    }
    if (post.postedBy.toString() !== userId) {
      throw { status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" };
    }
    return response;
  } catch (error) {
    console.log("Update post service error", error);
    throw error;
  }
};

export const getPostsByTypeService = async (type) => {
  try {
    const posts = await postRepository.getPostsByType(type);
    return posts;
  } catch (error) {
    console.log("Get posts by type service error", error);
    throw error;
  }
};
