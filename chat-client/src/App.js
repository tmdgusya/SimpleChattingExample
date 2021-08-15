import "./app.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { ChattingRoomList } from "./room/CreateChattingRoom";
import io from "socket.io-client";

const { ChattingComponent } = require("./chatting/ChattingComponent");
export const socket = io.connect("http://localhost:8080");

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Route path={`/room_list`}>
        <ChattingRoomList />
      </Route>
      <Route path={`/chat/:id`}>
        <ChattingComponent />
      </Route>
    </BrowserRouter>
  );
}

export default App;
