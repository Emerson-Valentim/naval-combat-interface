import { useQuery } from "@apollo/client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";

import FullscreenLoadingContext from "../../../../../../context/3";
import SocketContext from "../../../../../../context/Socket";
import UserContext, { User } from "../../../../../../context/User";
import AddRoleButton from "../AddRoleButton";
import CustomBadge from "../CustomBadge";

import Styled from "./styled";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      roles
      balance
    }
  }
`;

const List: React.FC = () => {
  const { data, loading, refetch } = useQuery(GET_USERS);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  const { user: agent } = useContext(UserContext);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("client:user:create", async () => {
      await refetch();
    });

    socket.on("client:user:update", async () => {
      await refetch();
    });

    return () => {
      socket.off("client:user:create");
      socket.off("client:user:update");
    };
  }, []);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <Styled.List>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Saldo</Th>
            <Th>Cargos</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.getUsers.map((user: User, index: number) => {
            return (
              <Tr key={index}>
                <Td>{user.username}</Td>
                <Td width="30%">R$: {(user.balance / 100).toFixed(2)}</Td>
                <Styled.Badges>
                  <CustomBadge role="user" roles={user.roles} />
                  <CustomBadge role="maintainer" roles={user.roles} />
                  <CustomBadge role="admin" roles={user.roles} />
                </Styled.Badges>
                <Td>
                  <AddRoleButton
                    id={user.id}
                    roles={user.roles}
                    disabled={agent.id === user.id}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Styled.List>
  );
};

export default List;
