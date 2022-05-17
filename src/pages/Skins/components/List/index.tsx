import { useQuery } from "@apollo/client";
import { Table, Tbody, Td, Th, Thead, Tr, Image } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";

import FullscreenLoadingContext from "../../../../context/Loading";
import SocketContext from "../../../../context/Socket";
import UserContext from "../../../../context/User";
import { Skin } from "../../../Admin/components/Skins";
import BuySkinButton from "../BuySkinButton";
import SelectSkinButton from "../SelectSkinButton";

import Styled from "./styled";

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

const List: React.FC = () => {
  const { data, loading, refetch } = useQuery(GET_SKINS);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { user } = useContext(UserContext);
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

  return (
    <Styled.Box p={5} borderRadius={10}>
      <Styled.List>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Custo</Th>
              <Th>Avatar</Th>
              <Th>Cenário</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.getSkins?.map((skin: Skin, index: number) => {
              const isCurrentSkin = skin.id === user?.skin?.current?.id;

              const isSkinBought = user?.skin?.available?.includes(skin.id);

              return (
                <Tr key={index}>
                  <Td width="20%">{skin.name}</Td>
                  <Td>R$: {(skin.cost / 100).toFixed(2)}</Td>
                  <Td width="20%">
                    <Image src={skin.avatar} width="40%" />
                  </Td>
                  <Td width="20%">
                    <Image src={skin.scenario} />
                  </Td>
                  <Styled.ButtonsColumn>
                    <BuySkinButton disabled={isSkinBought} id={skin.id} />
                    <SelectSkinButton
                      disabled={!isSkinBought || isCurrentSkin}
                      current={isCurrentSkin}
                      id={skin.id}
                    />
                  </Styled.ButtonsColumn>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Styled.List>
    </Styled.Box>
  );
};

export default List;
