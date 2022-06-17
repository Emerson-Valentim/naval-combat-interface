import { Tag } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: rgb(80, 140, 255);

  width: fit-content;

  border-radius: 10px;

  img {
    height: 250px;
  }
`;

const Title = styled.p`
  text-align: center;

  font-weight: 600;
`;

const Meta = styled.div`
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
