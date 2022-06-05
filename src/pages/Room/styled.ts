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
  width: 100%;
  display: flex;
  flex-direction: row;

  flex: 1;
`;

const Column = styled(Box)`
  width: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  margin: 10px;
`;

const FirstColumn = styled(Column)`
  flex: 1;
`;

const SecondColumn = styled(Column)`
  flex: 2;
`;

const ThirdColumn = styled(Column)`
  flex: 1;
`;

export default {
  RoomTitle,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  RoomBox,
  Room,
};
