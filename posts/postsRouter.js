import express from 'express'
import { getPosts, addPost, editPostLikes, addComment } from './postsController.js';
import v from "express-joi-validation";
import multer from "multer";
import { postsValidationSchema, commentSchema} from './postsValidationSchema.js';

const postsRouter = express.Router()

const validation = v.createValidator({});
const upload = multer({ storage: multer.memoryStorage() });

postsRouter.get("", getPosts);
postsRouter.post("", upload.single('photo'),validation.body(postsValidationSchema), addPost);
postsRouter.put("/:id/likes", editPostLikes);
postsRouter.post("/:id/comments", validation.body(commentSchema), addComment);

export default postsRouter;