import "./app.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { ChattingRoomList } from "./room/CreateChattingRoom";

const { ChattingComponent } = require("./chatting/ChattingComponent");

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Route path={`/room_list`}>
        <ChattingRoomList />
      </Route>
      <Route path={`/chat`}>
        <ChattingComponent />
      </Route>
    </BrowserRouter>
  );
}

export default App;
