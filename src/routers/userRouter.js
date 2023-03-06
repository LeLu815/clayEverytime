import express from "express";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middleware";
import {getEdit, postEdit, remove, logout, getKkt, getChangePassword, postChangePassword, see, getCalenderAddForm, postCalenderAddForm, deleteCalenderInfo} from "../controllers/userController"


const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("profileImg"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/remove", protectorMiddleware, remove);
userRouter.get("/kakao",publicOnlyMiddleware, getKkt);
userRouter.route("/calenderAddForm/:id").all(protectorMiddleware).get(getCalenderAddForm).post(postCalenderAddForm);
userRouter.route("/:id([0-9a-f]{24})").get(see);
userRouter.route("/deleteCalenderInfo/:id").all(protectorMiddleware).get(deleteCalenderInfo);

export default userRouter;
