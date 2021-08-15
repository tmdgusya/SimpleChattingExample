const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const model = require("./model");
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

app.get("/rooms", (req, res) => {
  res.send({
    rooms: [
      { name: "로치의 채팅방", user: "roach" },
      { name: "로치의 채팅방", user: "roach" },
    ],
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
