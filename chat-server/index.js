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
  const getRoomsQuery = `select p.*, u.nickname from rooms as p inner join users as u on u.id = p.user_id;`;
  const result = await sequelize.query(getRoomsQuery, {
    type: QueryTypes.SELECT,
    row: true,
  });
  res.send({
    rooms: result,
  });
});

app.get("/rooms/:id", async (req, res) => {
  const room_id = req.params.id;

  const getRoomsAndUserQuery = `
  select m.content as chat, u.nickname as name
  from messages as m
  inner join users as u on u.id = m.user_id
  where m.room_id = ${room_id};`;

  const messsages = await sequelize.query(getRoomsAndUserQuery, {
    type: QueryTypes.SELECT,
    row: true,
  });
  res.send({ messsages });
});

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ name, chat, room_id, user_id }) => {
    //TODO DB 에 MESSAGE 를 저장하자, room_id, user_id, chat async 로 한다.
    model.Message.create({ content: chat, user_id, room_id });
    io.emit("receiveMessage", { name, chat, user_id });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server On 8080");
});
