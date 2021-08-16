import "./app.css";
import { BrowserRouter, Route } from "react-router-dom";
import { ChattingRoomList } from "./room/CreateChattingRoom";
import io from "socket.io-client";
import { LoginComponent } from "./login/LoginComponent";

const { ChattingComponent } = require("./chatting/ChattingComponent");
export const socket = io.connect("http://localhost:8080");

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Route path={`/room_list`}>
        <ChattingRoomList />
      </Route>
      <Route path="/login">
        <LoginComponent />
      </Route>
      <Route path={`/chat/:id`}>
        <ChattingComponent />
      </Route>
    </BrowserRouter>
  );
}

export default App;
