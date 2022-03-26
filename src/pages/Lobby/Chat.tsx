import { Input } from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Button from "../../components/button/Button";

import SocketContext from "../../context/socket/Socket";
import UserContext from "../../context/user/User";
import { parseBuffer } from "../../utils/buffer-parser";

import Styled from "./styled";

const Chat: React.FC = () => {
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const chatRef = useRef<HTMLDivElement>(null);

  const [messages, updateMessages] = useState<
    {
      message: string;
      sender: string;
    }[]
  >([]);

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

  useEffect(() => {
    socket.on("client:room:update", ({ message, username, action }: any) => {
      if (action === "message") {
        updateMessages((value) =>
          value.concat([
            {
              message,
              sender: username,
            },
          ])
        );
      }

      if (["leave", "join"].includes(action)) {
        updateMessages((value) =>
          value.concat([
            {
              message: `${action === "leave" ? "left" : "entered"} the room`,
              sender: username,
            },
          ])
        );

        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      socket.off("client:room:update");
    };
  }, []);

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
          const isLastMessage = index === messages.length - 1;
          return (
            <Styled.ChatMessage
              key={`message-${index}`}
              isOwner={user.username === sender}
              ref={isLastMessage ? chatRef : null}
            >
              {sender}: {message}
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
