import { Box as CBox } from "@chakra-ui/react";
import styled from "styled-components";

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;

  height: 10%;
  padding: 1em;
`;

const Box = styled(CBox)`
  background-color: white;

  min-height: 50vh;
  min-height: 70vh;

  overflow: scroll;
`;

export default {
  Navigation,
  Box,
};
