const express = require("express");
const RoomRouter = express.Router();
const model = require("../model");
const sequelize = model.sequelize;
const { QueryTypes } = require("sequelize");

RoomRouter.get("/rooms", async (req, res) => {
  const getRoomsQuery = `
  select r.*, u.nickname from rooms as r
  inner join users as u on u.id = r.user_id;`;
  const result = await sequelize.query(getRoomsQuery, {
    type: QueryTypes.SELECT,
    row: true,
  });
  res.send({
    rooms: result,
  });
});

RoomRouter.get("/rooms/:id", async (req, res) => {
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

module.exports = RoomRouter;
