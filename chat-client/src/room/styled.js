import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const ChattingRoomBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  background-color: white;
`;

export const RoomBox = styled.div`
  display: flex;
  border: 1px solid black;
  padding-left: 10px;
`;

export const RoomName = styled.h3``;

export const RoomUser = styled.p`
  margin-left: 10px;
  line-height: 30px;
`;

export const CreateRoomButton = styled.button`
  witdh: 120px;
  height: 40px;
  backgroun: green;
  position: -webkit-sticky;
  position: sticky;
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    display: "flex",
    flexDirection: "column",
    background: "white",
    alignItems: "center",
    justifyContent: "center",
    "@media all and (-ms-high-contrast: none)": {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const RoomButtonStyles = makeStyles((theme) => ({
  margin: {
    top: 10,
  },
}));
