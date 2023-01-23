import express from "express";
import { protectorMiddleware } from "../middleware";
import {see,  getUpload, postUpload, blackCarrot} from "../controllers/blackCarrotController";
import {secretLounge, secretLoungeContent, getEdit, postEdit, deleteSecretContent} from "../controllers/secretController";
const carrotRouter = express.Router();

// 흙당근
carrotRouter.get("/blackCarrot", blackCarrot);
// 흙당근 페이지와 상세페이지 만들어야함.
// carrotRouter.get("/blackCarrot/:id([0-9a-f]{24})", secretLoungeContent);

// 비밀게시글
carrotRouter.get("/secretLounge", secretLounge);
carrotRouter.get("/secretLounge/:id([0-9a-f]{24})", secretLoungeContent);
carrotRouter.route("/secretLounge/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
carrotRouter.route("/secretLounge/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteSecretContent).post(deleteSecretContent);
// carrotRouter.get("/:id(\\d+)", see);
// carrotRouter.get("/:id(\\d+)/edit", edit);
// carrotRouter.get("/:id(\\d+)/delete", deleteContent);
carrotRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);

export default carrotRouter;