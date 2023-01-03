import express from "express";
import {trending, search} from "../controllers/contentController";
import {join, login} from "../controllers/userController"

const globalRouter = express.Router();

// globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/", trending);
globalRouter.get("/search", search);

export default globalRouter;