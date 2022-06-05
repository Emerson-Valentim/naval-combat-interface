import styled from "styled-components";

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
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
