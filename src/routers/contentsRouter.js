import express from "express";

import {see, edit, upload, deleteContent, blackCarrot} from "../controllers/contentController";

const carrotRouter = express.Router();

carrotRouter.get("/blackCarrot", blackCarrot);
carrotRouter.get("/:id(\\d+)", see);
carrotRouter.get("/:id(\\d+)/edit", edit);
carrotRouter.get("/:id(\\d+)/delete", deleteContent);
carrotRouter.get("/upload", upload);

export default carrotRouter;