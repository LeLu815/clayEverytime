import express from "express";

import {edit, remove, logout, see} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/see", see);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;
