// import "./env"; require 는 import 보다 느려서 따로 파일을 만들어서 파일 통채로 임포트 해주면 선언문처럼 취급되어 우선순위로 올라간다
import "dotenv/config";
import "./db";
import "./models/Content";
import "./models/User"
import "./models/Comment"
import "./models/NestedCOmment";
import app from "./sever";

const PORT = 4000;

const handleListening = () => {
    console.log(`✅ Server is listening on port : http://localhost:${PORT}/`);
}

app.listen(PORT, handleListening);