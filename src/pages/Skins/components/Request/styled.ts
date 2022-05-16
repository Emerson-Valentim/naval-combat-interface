import { Box as CBox } from "@chakra-ui/react";
import styled from "styled-components";
import InputMask from "react-number-format";

const Box = styled(CBox)`
  width: 30%;

  display: flex;

  background-color: white;
`;

const Input = styled(InputMask)`
  width: 100%;
`;

export default {
  Box,
  Input,
};
