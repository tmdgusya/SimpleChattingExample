import { useState } from "react";
import { getFetch, postFetch } from "../utils/apiClient";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import {
  ChattingRoomBox,
  CreateRoomButton,
  RoomBox,
  RoomButtonStyles,
  RoomName,
  RoomUser,
  useStyles,
} from "./styled";

export const ChattingRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const modalClass = useStyles();
  const createButtonClass = RoomButtonStyles();

  useState(() => {
    getFetch("rooms").then(({ data: { rooms } }) => {
      setRooms(rooms);
    });
  }, [rooms]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const createRoom = () => {
    console.log("create");
    //TODO POST API
    postFetch("rooms", { room: roomName }).then(({ data }) => {
      console.log(data);
      handleClose();
    });
  };

  const ModalComponent = (
    <div className={modalClass.root}>
      <h2 id="simple-modal-title">만들 방이름을 입력해주세요</h2>
      <input value={roomName} onChange={onChangeRoomName}></input>
      <Button
        variant="contained"
        color="primary"
        onClick={createRoom}
        className={createButtonClass.margin}
      >
        만들기
      </Button>
    </div>
  );

  return (
    <ChattingRoomBox>
      {rooms?.map((room, index) => {
        return (
          <RoomBox key={index}>
            <RoomName>{room.name}</RoomName>
            <RoomUser>방장: {room.user}</RoomUser>
          </RoomBox>
        );
      })}
      <CreateRoomButton type="button" onClick={handleOpen}>
        방만들기
      </CreateRoomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={modalClass.modal}
      >
        {ModalComponent}
      </Modal>
    </ChattingRoomBox>
  );
};
