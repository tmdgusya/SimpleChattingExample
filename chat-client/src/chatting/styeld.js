import styled from "styled-components";

export const ChattingForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const MessageBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow: scroll;
`;

export const ChatBox = styled.h3`
  with: 200px;
  padding: 3px;
  margin-left: 10px;
  background: #dfe7fd;
  border-radius: 10px;
`;

export const UserBox = styled.h3`
  line-height: 29px;
`;

export const MessageBox = styled.div`
  display: flex;
  border-radius: 4px;
  padding-left: 20px;
  border: 1px solid white;
`;

export const ChattingBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const NameInput = styled.input`
  width: 80px;
  height: 30px;
  border-radius: 4px;
  border: 1 px solid green;
`;

export const ChattingInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: 1 px solid green;
`;
