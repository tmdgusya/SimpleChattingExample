const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const model = require("./model");
const { QueryTypes } = require("sequelize");
const sequelize = model.sequelize;

sequelize.sync();

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/rooms", async (req, res) => {
  const roomName = req.body.room;
  const data = await model.Room.create({ name: roomName, user_id: 1 });
  res.send(data);
});

app.get("/rooms", async (req, res) => {
  //TODO 이것도 소켓으로 꽂아야 된다.
  //이건 소켓 브로드 캐스트로 전체 다보이게 꽂아야 된다.
  const getRoomsQuery = `select p.*, u.nickname from rooms as p inner join users as u on u.id = p.user_id;`;
  const result = await sequelize.query(getRoomsQuery, {
    type: QueryTypes.SELECT,
    row: true,
  });
  res.send({
    rooms: result,
  });
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
