import styled from "styled-components";

const Container = styled.div`
  padding: 8px;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  background-color: purple;
`;

const SkinContainer = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;

  background-color: green;
`;

export default {
  Container,
  SkinContainer,
};
