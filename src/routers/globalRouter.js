import express from "express";
import {trending, search} from "../controllers/blackCarrotController";
import {getJoin, postJoin, getLogin, postLogin} from "../controllers/userController"

const globalRouter = express.Router();


globalRouter.get("/", trending);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/search", search);

export default globalRouter;