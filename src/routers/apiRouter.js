import express from "express";
import { idCheck, emailCheck } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").post(idCheck);
apiRouter.route("/join/:id/emailChecks").post(emailCheck);

export default apiRouter;