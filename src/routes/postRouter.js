import express from "express";
import {
  createPostController,
  deletePostController,
  getPaginatedPostsController,
  getPostByIdController,
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



export default router;
