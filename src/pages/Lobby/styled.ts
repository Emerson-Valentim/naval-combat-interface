import { Box, Text } from "@chakra-ui/react";
import { Form } from "formik";
import styled from "styled-components";

const Title = styled(Text)`
  font-size: 24px;
  text-align: center;

  border-radius: 1em 1em 0 0;
`;

const BoxWithPadding = styled(Box)`
  margin: 1em;

  height: 40vh;

  border: 1px solid;
  border-radius: 1em;

  padding: 1em;
`;

const LobbyContainer = styled.div`
  background-color: gray;
  height: 100vh;
`;

const LobbyNavigation = styled.div`
  display: flex;
  justify-content: space-between;

  height: 10%;
  padding: 1em;
`;

const LobbyBox = styled(Box)`
  margin: 1em;
  background-color: white;

  min-height: 50vh;
  min-height: 70vh;

  overflow: scroll;
`;

const RoomTitle = styled(Title)`
  padding: 0.1em;
`;

const RoomBox = styled(Box)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  min-height: 100vh;
  min-width: 100vw;
`;

const RoomWidgets = styled(Box)`
  display: flex;

  background-color: rgba(255, 255, 128, 0.5);
`;

const RoomInfoBox = styled(BoxWithPadding)`
  width: 100%;
  max-width: 30vw;

  background-color: rgba(255, 0, 128, 0.5);
`;

const ChatBox = styled(BoxWithPadding)`
  max-width: 70vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;

  background-color: rgba(128, 255, 128, 0.5);
`;

const ChatForm = styled(Form)`
  display: flex;

  padding-top: 0.5em;
`;

const Messages = styled(Box)`
  overflow: scroll;

  padding: 0 1em 0 1em;
`;

const ChatMessage = styled(Text)<{ color: string; isOwner: boolean }>`
  font-size: 12px;
  padding: 0.1em;

  color: ${({ color }) => color};
  text-align: ${({ isOwner }) => (isOwner ? "right" : "left")};
`;

export default {
  LobbyContainer,
  LobbyNavigation,
  LobbyBox,
  ChatBox,
  Messages,
  ChatMessage,
  RoomTitle,
  RoomWidgets,
  RoomInfoBox,
  RoomBox,
  ChatForm,
};
