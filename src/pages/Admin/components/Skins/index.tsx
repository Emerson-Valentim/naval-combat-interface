import { useQuery } from "@apollo/client";
import { Divider, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext, useEffect, useState } from "react";

import FullscreenLoadingContext from "../../../../context/3";
import SocketContext from "../../../../context/Socket";

import DeleteSkinButton from "./components/DeleteSkinButton";
import EditSkinButton from "./components/EditSkinButton";
import Form from "./components/Form";
import Styled from "./styled";

export interface Skin {
  id: string;
  cost: number;
  name: string;
  avatar: string;
  scenario: string;
  voice: string;
}

const GET_SKINS = gql`
  query getSkins {
    getSkins {
      id
      name
      cost
      avatar
      scenario
      voice
    }
  }
`;

const Skins: React.FC<{ id?: string }> = () => {
  const [currentSkin, setCurrentSkin] = useState<Skin>();

  const { data, loading, refetch } = useQuery(GET_SKINS);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("client:skin:add", async () => {
      await refetch();
    });

    socket.on("client:skin:update", async () => {
      await refetch();
    });

    return () => {
      socket.off("client:skin:add");
      socket.off("client:skin:update");
    };
  }, []);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  const updateSkin = (index: number) => {
    setCurrentSkin(data?.getSkins[index]);
  };

  return (
    <Styled.Box p={5} borderRadius={10}>
      <Styled.List>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Custo</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.getSkins?.map((skin: Skin, index: number) => {
              return (
                <Tr
                  key={index}
                  fontWeight={
                    skin.id === currentSkin?.id ? "semibold" : "unset"
                  }
                >
                  <Td>{skin.name}</Td>
                  <Td>R$: {(skin.cost / 100).toFixed(2)}</Td>
                  <Styled.ButtonsColumn>
                    <EditSkinButton onClick={updateSkin} index={index} />
                    <DeleteSkinButton id={skin.id} refetch={refetch} />
                  </Styled.ButtonsColumn>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Styled.List>
      <Divider orientation="vertical" m={4} variant="solid" />
      <Form skin={currentSkin} resetSkin={() => updateSkin(-1)} />
    </Styled.Box>
  );
};

export default Skins;
