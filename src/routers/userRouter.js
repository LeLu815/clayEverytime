import express from "express";
import { protectorMiddleware } from "../middleware";
import { publicOnlyMiddleware } from "../middleware";
import {getEdit, postEdit, remove, logout, getKkt, getChangePassword, postChangePassword} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/remove", protectorMiddleware, remove);
userRouter.get("/kakao",publicOnlyMiddleware, getKkt);

export default userRouter;
