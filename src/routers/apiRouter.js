import express from "express";
import { idCheck, emailCheck } from "../controllers/userController";
import { registerLikes } from "../controllers/blackCarrotController";
import { deleteMyStuff, getCalenderCancelBtn, addKilnSchedule, deleteKilnSchedule } from "../controllers/userController";
import { createComment, createNestedComment, commentEdit } from "../controllers/secretController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middleware";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").post(idCheck);
apiRouter.route("/join/:id/emailChecks").post(emailCheck);
apiRouter.route("/content/:id/likes").all(protectorMiddleware).get(registerLikes);
apiRouter.route("/content/:id([0-9a-f]{24})/comment").all(protectorMiddleware).post(createComment);
apiRouter.route("/content/:id([0-9a-f]{24})/commentEdit").all(protectorMiddleware).post(commentEdit);
apiRouter.route("/content/:id([0-9a-f]{24})/nestedComment").all(protectorMiddleware).post(createNestedComment);
apiRouter.route("/userProfile/:id").all(protectorMiddleware).post(deleteMyStuff);
apiRouter.route("/kilnScheduleAdd/:id").all(protectorMiddleware).get(addKilnSchedule);
apiRouter.route("/kilnScheduleDelete/:id").all(protectorMiddleware).get(deleteKilnSchedule);

export default apiRouter;