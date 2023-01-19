import express from "express";

import {edit, remove, logout, getKkt} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/kakao", getKkt);

export default userRouter;
