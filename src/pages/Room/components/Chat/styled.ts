import { Box, Text } from "@chakra-ui/react";
import { Form } from "formik";
import styled from "styled-components";

const BoxWithPadding = styled(Box)`
  margin: 1em;
  width: 100%;
  border-radius: 1em;
  padding: 1em;
`;

const ChatBox = styled(BoxWithPadding)`
  max-width: 30vw;

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
  font-size: 14px;
  font-weight: 700;

  margin-top: 0.3em;
  border-radius: 5px;

  color: ${({ isOwner }) => (isOwner ? "black" : "left")};
  text-align: ${({ isOwner }) => (isOwner ? "right" : "left")};
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

export default {
  ChatBox,
  Messages,
  ChatMessage,
  ChatForm,
};
