import { Box } from "@chakra-ui/react";
import styled from "styled-components";

const BoxWithPadding = styled(Box)`
  margin: 1em;

  height: 40vh;

  border: 1px solid;
  border-radius: 1em;

  padding: 1em;
`;

const RoomInfoBox = styled(BoxWithPadding)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  width: 100%;
  max-width: 30vw;

  padding: 1em;

  background-color: rgba(255, 0, 128, 0.5);
`;

export default {
  RoomInfoBox,
};
