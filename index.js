import express from "express";
import usersRouter from "./users/usersRouter.js";
import postsRouter from "./posts/postsRouter.js";
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use("/posts", postsRouter);

export default app