import express from "express";
import {
  createPostController,
  deletePostController,
  getPaginatedPostsController,
  getPostByIdController,
  getPostsByTypeController,
  getPostsByUserIdController,
  updatePostController,
} from "../controllers/postController.js";
import { uploader } from "../config/multerConfig.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  uploader.single("image"),
  createPostController
);

router.get("/", getPaginatedPostsController);

router.get(`/:id`, getPostByIdController);

router.delete("/:id", isAuthenticated, deletePostController);

router.put(
  "/:id",
  isAuthenticated,
  uploader.single("image"),
  updatePostController
);

router.get("/type/:type", getPostsByTypeController);

router.get("/user/:userId", isAuthenticated, getPostsByUserIdController);

export default router;
