import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/clayEveryTime");

const handleOpen =() => console.log("Connected to MongoDB");
const handleError = (error) => console.log("DB Error :", error);

const db = mongoose.connection;
db.on("error", handleError);
db.once("open", handleOpen);

// 파일 자체를 서버 파일에서 임포트 함으로써 server.js 에 mongo 를 연결해줄 수 있다
// mongodb://127.0.0.1:27017/