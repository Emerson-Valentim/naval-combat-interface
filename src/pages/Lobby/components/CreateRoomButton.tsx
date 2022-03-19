import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import {
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { Form, Formik, useFormik } from "formik";

import { useNavigate } from "react-router-dom";

import Button from "../../../components/button/Button";
import { parseBuffer } from "../../../utils/buffer-parser";
import FullscreenLoadingContext from "../../../context/loading/Loading";
import SocketContext from "../../../context/socket/Socket";

const CREATE_ROOM = gql`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      status
    }
  }
`;

const CreateRoomButton: React.FC = () => {
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [createRoom, { data, loading }] = useMutation(CREATE_ROOM, {
    variables: {
      input: {
        limit: 4,
        type: "PUBLIC",
        title: "Sala do Emerson",
      },
    },
  });

  const { initialValues, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: "Sala do Emerson",
      type: "PUBLIC",
      limit: 2,
    },
    onSubmit: (values): void => {
      createRoom({
        variables: {
          input: {
            limit: values.limit,
            type: values.type,
            title: values.title,
          },
        },
      });
    },
  });

  useEffect(() => {
    if (data?.createRoom) {
      socket.on(`client:room:ready:${data.createRoom.id}`, () => {
        setFullscreenLoading(true);

        socket.emit(
          `client:room:acknowledge`,
          parseBuffer({
            roomId: data.createRoom.id,
          })
        );

        navigate(`/room/${data.createRoom.id}`);

        setFullscreenLoading(false);
      });

      return () => {
        socket.off();
      };
    }
  }, [data]);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <>
      <Button disabled={loading} onClick={() => setModalOpen(true)}>
        Criar sala
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        closeOnOverlayClick={!loading}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar sala</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit as () => void}
          >
            <Form>
              <ModalBody>
                <FormLabel>Título</FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                />
                <FormLabel>Jogadores</FormLabel>
                <Input
                  id="limit"
                  type="number"
                  value={values.limit}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter display="flex" justifyContent="space-around">
                <Button width="100px" type="submit" disabled={loading}>
                  Criar
                </Button>
                <Button
                  width="100px"
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoomButton;
