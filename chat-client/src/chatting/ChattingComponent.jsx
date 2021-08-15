import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

export const ChattingComponent = () => {
  const [chat, setChat] = useState("");
  const [name, setName] = useState("");
  const [messageBox, setMessageBox] = useState([]);

  useEffect(() => {
    socket.on("sendMessage", ({ name, chat }) => {
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
    socket.emit("sendMessage", { name, chat });
    setChat("");
  };

  return (
    <div className="chatting_form">
      <form onSubmit={sendChatiing}>
        <h1>로치 심플 채팅😸</h1>
        <div className="chatting-box">
          <input
            name="name"
            onChange={onChangeName}
            value={name}
            label="Name"
          />
        </div>
        <div>
          <input
            name="message"
            onChange={onChangeChat}
            value={chat}
            label="Message"
          />
        </div>
        <button>메세지 전송</button>
      </form>
      <div className="render-chat">
        {messageBox.map(({ name, chat }, index) => {
          return (
            <div key={index}>
              <h3>
                {name}:<span>{chat}</span>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
