import { Box, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Title = styled(Text)`
  font-size: 24px;
  text-align: center;

  border-radius: 1em 1em 0 0;
`;

const RoomTitle = styled(Title)`
  padding: 0.1em;
`;

const RoomBox = styled(Box)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  min-height: 100vh;
  min-width: 100vw;
`;

const Room = styled(Box)`
  flex: 1;
`;

const RoomWidgets = styled(Box)`
  display: flex;

  background-color: rgba(255, 255, 128, 0.5);
`;

export default {
  RoomTitle,
  RoomWidgets,
  RoomBox,
  Room,
};
