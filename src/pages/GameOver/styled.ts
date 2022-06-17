import { Container as CContainer } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled(CContainer)`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  height: 100vh;
  max-width: 100vw !important;
`;

const Title = styled.div`
  width: fit-content;

  font-size: 4em;
  font-weight: 700;
  background-color: white;

  padding: 5px;
  border-radius: 10px;
  margin-bottom: 1em;
`;

export default {
  Container,
  Title,
};
