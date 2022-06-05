import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 100%;

  margin: 5px;
`;

const Title = styled.div`
  width: fit-content;

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
