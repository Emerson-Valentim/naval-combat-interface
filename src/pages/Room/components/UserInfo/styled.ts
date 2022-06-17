import { Tag } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: rgb(80, 140, 255);

  min-width: 50%;

  border-radius: 10px;

  align-items: center;

  img {
    width: fit-content;
    height: ${window.innerHeight * 0.25}px;
  }
`;

const Title = styled.p`
  text-align: center;

  font-weight: 600;
`;

const Meta = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const MetaTag = styled(Tag)`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
`;

export default {
  Container,
  Title,
  Meta,
  MetaTag,
};
