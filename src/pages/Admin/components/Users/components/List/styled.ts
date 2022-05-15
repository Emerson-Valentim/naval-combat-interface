import { Td } from "@chakra-ui/react";
import styled from "styled-components";

const List = styled.div`
  overflow: scroll;

  width: 100%;
`;

const Badges = styled(Td)`
  span {
    margin: 0 2px 0 2px;
  }
`;

export default {
  List,
  Badges,
};
