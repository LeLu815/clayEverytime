import express from "express";
import { protectorMiddleware, uploadFiles } from "../middleware";
import {see,  getUpload, postUpload, blackCarrot} from "../controllers/blackCarrotController";
import {
    secretLounge, 
    secretLoungeContent, 
    getEdit, postEdit, 
    deleteSecretContent, deleteSecretComment, deleteSecretNestedComment, 
    getSecretLoungeCommentEdit, postSecretLoungeCommentEdit,
} from "../controllers/secretController";
import { 
    shareInfoLounge,

} from "../controllers/shareInfoController";

const contentRouter = express.Router();

// 흙당근
contentRouter.get("/blackCarrot", blackCarrot);
// 흙당근 페이지와 상세페이지 만들어야함.
// contentRouter.get("/blackCarrot/:id([0-9a-f]{24})", secretLoungeContent);

// 비밀게시글
contentRouter.get("/secretLounge", secretLounge);
contentRouter.get("/secretLounge/:id([0-9a-f]{24})", secretLoungeContent);
contentRouter.route("/secretLounge/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("image"), postEdit);
contentRouter.route("/secretLounge/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteSecretContent).post(deleteSecretContent);
contentRouter.route("/secretLounge/nestedComment/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getSecretLoungeCommentEdit).post(postSecretLoungeCommentEdit);
contentRouter.route("/secretLounge/comment/:id/delete").all(protectorMiddleware).get(deleteSecretComment);
contentRouter.route("/secretLounge/nestedComment/:id/delete").all(protectorMiddleware).get(deleteSecretNestedComment);

contentRouter.route("/shareInfoLounge").get(shareInfoLounge);

contentRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadFiles.single("image"), postUpload);

export default contentRouter;