import { Box as CBox } from "@chakra-ui/react";
import styled from "styled-components";

const Box = styled(CBox)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default {
  Box,
};
