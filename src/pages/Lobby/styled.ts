import { Box } from "@chakra-ui/react";
import styled from "styled-components";

const LobbyContainer = styled.div`
  background-color: gray;
  height: 100vh;
`;

const LobbyNavigation = styled.div`
  display: flex;
  justify-content: space-between;

  height: 10%;
  padding: 1em;
`;

const LobbyBox = styled(Box)`
  margin: 1em;
  background-color: white;

  min-height: 50vh;
  max-height: 70vh;

  overflow: scroll;
`;

export default {
  LobbyContainer,
  LobbyNavigation,
  LobbyBox,
};
