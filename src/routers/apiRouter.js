import express from "express";
import { idCheck, idCheckSend } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.route("/join/:id/idChecks").get(idCheckSend).post(idCheck);

export default apiRouter;