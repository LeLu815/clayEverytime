import "./db";
import "./models/Content";
import "./models/User"
import app from "./sever";

const PORT = 4000;

const handleListening = () => {
    console.log(`✅ Server is listening on port : http://localhost:${PORT}/`);
}

app.listen(PORT, handleListening);