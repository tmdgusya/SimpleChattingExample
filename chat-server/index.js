const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const sequelize = require("./model").sequelize;

sequelize.sync();

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/rooms", (req, res) => {
  //TODO 서버에 방을 만들 수 있도록 한다.
  //Response 로 방목록을 알려준다.
});

app.get("/rooms", (req, res) => {
  //TODO 방목록을 가져다 준다.
});

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ name, chat }) => {
    io.emit("receiveMessage", { name, chat });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server On 8080");
});
