import { gql, useQuery } from "@apollo/client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

import FullscreenLoadingContext from "../../../../../../context/Loading";
import SocketContext from "../../../../../../context/Socket";
import ApproveCreditButton from "../ApproveCreditButton";

import Styled from "./styled";

interface Fund {
  id: string;
  value: number;
  username: string;
}

const GET_PENDING_FUNDS = gql`
  query getPendingFunds {
    getPendingFunds {
      id
      username
      value
    }
  }
`;

const List: React.FC = () => {
  const { data, loading, refetch } = useQuery(GET_PENDING_FUNDS);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("client:funds:approve", async () => {
      await refetch();
    });

    socket.on("client:funds:request", async () => {
      await refetch();
    });
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
            <Th>Valor</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.getPendingFunds?.map((fund: Fund, index: number) => {
            return (
              <Tr key={index}>
                <Td>{fund.username}</Td>
                <Td>R$: {(fund.value / 100).toFixed(2)}</Td>
                <Td>
                  <ApproveCreditButton id={fund.id} />
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
