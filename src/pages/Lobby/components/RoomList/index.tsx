import { useQuery } from "@apollo/client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";

import FullscreenLoadingContext from "../../../../context/Loading";
import SocketContext from "../../../../context/Socket";
import JoinRoomButton from "../JoinRoomButton";

import Styled from "./styled";

const GET_ROOMS = gql`
  query getRooms {
    getRooms {
      id
      title
      limit
      players
    }
  }
`;

const RoomList: React.FC = () => {
  const { data, loading, refetch } = useQuery(GET_ROOMS, {
    fetchPolicy: "network-only",
  });
  const { socket } = useContext(SocketContext);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  useEffect(() => {
    socket.on("client:room:refresh", () => {
      refetch();
    });

    return () => {
      socket.off("client:room:refresh");
    };
  }, []);

  return (
    <Styled.Box p={5} borderRadius={10}>
      <Table variant="simple" overflow="scroll">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Título</Th>
            <Th>Lugares</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.getRooms?.map((room: any, index: number) => {
            return (
              <Tr key={index}>
                <Td>{room.id}</Td>
                <Td>{room.title}</Td>
                <Td>{`${room.players.length}/${room.limit}`}</Td>
                <Td>
                  <JoinRoomButton key={`join-${index}`} roomId={room.id} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Styled.Box>
  );
};

export default RoomList;
