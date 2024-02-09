const express = require("express");
const app = express();
app.use(express.json());

const origin = process.env.ORIGIN?.split(",") || "http://localhost:3000";

const cors = require("cors");
const corsOptions = {
  origin: origin,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dbConnect = require("./utils/db.utils");
dbConnect();

const userRouter = require("./routes/user.routes");

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
const server = require("http").createServer(app);
require("./socket")(server);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
