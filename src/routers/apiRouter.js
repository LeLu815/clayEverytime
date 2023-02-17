import express from "express";
import { idCheck, emailCheck } from "../controllers/userController";
import { registerLikes } from "../controllers/blackCarrotController";
import { deleteMyStuff } from "../controllers/userController";
import { createComment, createNestedComment, commentEdit } from "../controllers/secretController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").post(idCheck);
apiRouter.route("/join/:id/emailChecks").post(emailCheck);
apiRouter.route("/content/:id/likes").get(registerLikes);
apiRouter.route("/content/:id([0-9a-f]{24})/comment").post(createComment);
apiRouter.route("/content/:id([0-9a-f]{24})/commentEdit").post(commentEdit);
apiRouter.route("/content/:id([0-9a-f]{24})/nestedComment").post(createNestedComment);
apiRouter.route("/userProfile/:id").post(deleteMyStuff);

export default apiRouter;