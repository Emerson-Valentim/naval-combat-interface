import { Input, Tag, Tooltip } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import Button from "../../../../components/Button";
import SocketContext from "../../../../context/Socket";
import UserContext from "../../../../context/User";
import { parseBuffer } from "../../../../utils/buffer-parser";

import Styled from "./styled";

export interface Messages {
  message: string;
  sender: string;
}

const Chat: React.FC<{
  messages: Messages[];
}> = ({ messages }) => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const params = useParams();

  const { initialValues, values, handleSubmit, handleChange, resetForm } =
    useFormik({
      initialValues: {
        message: "",
      },
      onSubmit: (values): void => {
        sendMessage(values.message);
      },
    });

  const sendMessage = (message: string) => {
    if (message) {
      socket.emit(
        "client:room:message",
        parseBuffer({
          roomId: params.roomId,
          message,
        })
      );

      resetForm();
    }
  };

  return params.roomId ? (
    <Styled.ChatBox>
      <Styled.Messages>
        {messages.map(({ message, sender }, index) => {
          const isOwner = user.username === sender;
          return (
            <Styled.ChatMessage key={`message-${index}`} isOwner={isOwner}>
              <Tooltip label={sender}>
                <Tag
                  backgroundColor={isOwner ? "black" : "white"}
                  color={isOwner ? "white" : "black"}
                  padding={1}
                >
                  {message}
                </Tag>
              </Tooltip>
            </Styled.ChatMessage>
          );
        })}
      </Styled.Messages>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit as () => void}
      >
        <Styled.ChatForm>
          <Input
            id="message"
            backgroundColor="white"
            value={values.message}
            onChange={handleChange}
          />
          <Button padding={5} ml={1} type="submit">
            Enviar
          </Button>
        </Styled.ChatForm>
      </Formik>
    </Styled.ChatBox>
  ) : (
    <Navigate to="/lobby" />
  );
};

export default Chat;
