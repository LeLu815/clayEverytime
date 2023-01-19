import express from "express";
import { idCheck, idCheckSend, emailCheck, emailCheckSend } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").get(idCheckSend).post(idCheck);
apiRouter.route("/join/:id/emailChecks").get(emailCheckSend).post(emailCheck);

export default apiRouter;