import { Stack } from "@chakra-ui/react";
import styled from "styled-components";

const CustomStack = styled(Stack)`
  width: 30%;
  min-height: 30%;

  label {
    margin: 0;
    margin-left: 16px;

    cursor: pointer;
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

const MediaPreview = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2em !important;

  img {
    max-height: 10em;
  }
`;

export default {
  MediaPreview,
  CustomStack,
};
