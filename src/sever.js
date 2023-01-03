import express from "express";
import morgan from "morgan";
import userRouter from "./routers/contentsRouter";
import globalRouter from "./routers/globalRouter";
import contentRouter from "./routers/contentsRouter";
import { runtime } from "webpack";

const app = express();

const logger = morgan("dev");
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use("/client", express.static("src/client"));
app.use("/assets", express.static("assets"));
app.use('/', globalRouter);
app.use("/users", userRouter);
app.use("/content", contentRouter);

const handleListening = () => {
    console.log(`✅ Server is listening on port : http://localhost:${PORT}/`);
}

app.listen(PORT, handleListening);
