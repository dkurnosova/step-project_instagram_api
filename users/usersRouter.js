import express from 'express'
import {  getUser, addUser, getUsers, editUserSubscribers } from './usersController.js';
import v from 'express-joi-validation'
import multer from 'multer'
import usersValidationSchema from './usersValidationSchema.js';

const usersRouter = express.Router()

const validation = v.createValidator({})
const upload = multer({ storage: multer.memoryStorage() });

usersRouter.get('', getUsers)

usersRouter.get("/:id", getUser);

usersRouter.post("", upload.single("icon"), validation.body(usersValidationSchema), addUser);

usersRouter.put("/:id/subscriptions", editUserSubscribers);

export default usersRouter