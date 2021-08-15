import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../App";
import {
  ChatBox,
  ChattingBox,
  ChattingForm,
  ChattingInput,
  MessageBox,
  MessageBoxDiv,
  NameInput,
  UserBox,
} from "./styeld";

export const ChattingComponent = () => {
  const [chat, setChat] = useState("");
  const [name, setName] = useState("");
  const [messageBox, setMessageBox] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    socket.on("receiveMessage", ({ name, chat }) => {
      setMessageBox([...messageBox, { name, chat }]);
    });
  });

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const sendChatiing = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { name, chat, room_id: id, user_id: 1 });
    setChat("");
  };

  return (
    <ChattingForm>
      <h1>로치 심플 채팅😸</h1>
      <MessageBoxDiv>
        {messageBox.map(({ name, chat }, index) => {
          return (
            <MessageBox key={index}>
              <UserBox>{name}:</UserBox>
              <ChatBox>{chat}</ChatBox>
            </MessageBox>
          );
        })}
      </MessageBoxDiv>
      <ChattingBox>
        <NameInput
          name="name"
          onChange={onChangeName}
          value={name}
          label="Name"
        />
        <ChattingInput
          name="message"
          onChange={onChangeChat}
          value={chat}
          label="Message"
        />
        <button onClick={sendChatiing}>전송</button>
      </ChattingBox>
    </ChattingForm>
  );
};
