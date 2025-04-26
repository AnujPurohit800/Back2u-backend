import { StatusCodes } from "http-status-codes";
import {
  createPostService,
  deletePostService,
  getPaginatedPostsService,
  getPostByIdService,
} from "../services/postServices.js";

export async function createPostController(req, res) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Image is required",
      });
    }
    const { title, type, description, category, location } = req.body;
    const post = await createPostService({
      title,
      description,
      category,
      location,
      type,
      image: req.file.path,
      postedBy: req.user,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log("Create post controller error", error);
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
}

export async function getPaginatedPostsController(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await getPaginatedPostsService(page, limit);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.log("Get paginated posts controller error", error);
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
}

export async function getPostByIdController(req, res) {
  try {
    const { id } = req.params;
    const post = await getPostByIdService(id);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    console.log("Get post by ID details controller error", error);
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
}

export async function deletePostController(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user;
    const deletedPost = await deletePostService(postId, userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.log("Delete post controller error", error);
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
}
