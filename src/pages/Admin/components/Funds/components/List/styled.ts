import { Box as CBox, Td } from "@chakra-ui/react";
import styled from "styled-components";

const Box = styled(CBox)`
  width: 100%;

  display: flex;
  margin: 1em;

  background-color: white;
`;

const List = styled.div`
  overflow: scroll;

  width: 100%;
`;

const ButtonsColumn = styled(Td)`
  display: flex;

  button {
    margin: 4px;
  }
`;

export default {
  List,
  Box,
  ButtonsColumn,
};
