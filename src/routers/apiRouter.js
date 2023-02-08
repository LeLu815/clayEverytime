import express from "express";
import { idCheck, emailCheck } from "../controllers/userController";
import { registerLikes } from "../controllers/blackCarrotController";
import { deleteMyStuff } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").post(idCheck);
apiRouter.route("/join/:id/emailChecks").post(emailCheck);
apiRouter.route("/content/:id/likes").get(registerLikes);
apiRouter.route("/userProfile/:id").post(deleteMyStuff);

export default apiRouter;