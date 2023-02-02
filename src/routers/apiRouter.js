import express from "express";
import { idCheck, emailCheck } from "../controllers/userController";
import { registerLikes } from "../controllers/blackCarrotController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").post(idCheck);
apiRouter.route("/join/:id/emailChecks").post(emailCheck);
apiRouter.route("/content/:id/likes").get(registerLikes);

export default apiRouter;