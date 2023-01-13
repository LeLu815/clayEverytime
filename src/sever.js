import express from "express";
import morgan from "morgan";
import session from "express-session";
import userRouter from "./routers/contentsRouter";
import globalRouter from "./routers/globalRouter";
import contentRouter from "./routers/contentsRouter";
import { runtime } from "webpack";
import { localsMiddleware } from "./middleware";
import apiRouter from "./routers/apiRouter";
import bodyParser from "body-parser";

const app = express();

const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));

// 전역적으로 locals 변수를 사용해서 웹사이트 이름을 바꿀 수 있다.
app.use(session({
    secret:"hello",
    resave:true,
    saveUninitialized:true,
}));
app.use(bodyParser.json())

app.use(localsMiddleware);
app.use("/client", express.static("src/client"));
app.use("/assets", express.static("assets"));
app.use('/', globalRouter);
app.use("/users", userRouter);
app.use("/content", contentRouter);
app.use("/api", apiRouter);

export default app;
