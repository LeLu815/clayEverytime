import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
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
// MongoStore 을 통하여 세션을 db 에 저장할 수 있다. : 서버 재부팅을 해도 세션정보가 날아가지 않기 때문에 로그인 상태를 유지할 수 있다.
// 원래는 collections 안에 sessions 가 없었는데 해당 모듈 사용 후부터 생기게 된다. 
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:true,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
}));
app.use(bodyParser.json());

app.use(localsMiddleware);
// express.static() 을 사용하는 이유는 별도의 라우터를 만들지 않고도 해당 url을 개설해주는 역할을 한다.
app.use("/client", express.static("src/client"));
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use('/', globalRouter);
app.use("/users", userRouter);
app.use("/content", contentRouter);
app.use("/api", apiRouter);

export default app;
