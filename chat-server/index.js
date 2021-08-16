const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const model = require("./model");
const { QueryTypes } = require("sequelize");
const RoomRouter = require("./route/room");
const sequelize = model.sequelize;
const passport = require("./passport");

sequelize.sync();

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", RoomRouter);

app.get(
  "/auth/kakao",
  passport.authenticate("kakao", { session: false }),
  (req, res) => {
    console.log(123123);
    res.send(req.user);
  }
);

app.get(
  "/oauth/callback",
  passport.authenticate("kakao", { session: false }),
  (req, res) => {
    console.log("!@#!#@");
    res.send(req.user);
  }
);

io.on("connection", (socket) => {
  socket.on("sendMessage", async ({ name, chat, room_id, user_id }) => {
    const message = await model.Message.create({
      content: chat,
      user_id,
      room_id,
    });
    io.emit(`receiveMessage${room_id}`, {
      id: message.id,
      name,
      chat,
      user_id,
    });
  });
  socket.on("createChattingRoom", async ({ room, user_id }) => {
    const data = await model.Room.create({ name: room, user_id });
    const getRoomsQuery = `select p.*, u.nickname from rooms as p inner join users as u on u.id = p.user_id;`;
    const result = await sequelize.query(getRoomsQuery, {
      type: QueryTypes.SELECT,
      row: true,
    });
    io.emit("getChattingRooms", { rooms: result });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server On 8080");
});
