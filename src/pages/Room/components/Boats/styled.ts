import styled from "styled-components";

const Container = styled.div`
  width: 60%;

  display: flex;
`;

const Boats = styled.div`
  flex: 1;
  margin-top: 5px;

  background-color: white;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;

  img {
    margin: 5px;
    height: 6em;

    cursor: pointer;
  }
`;

const Commands = styled.div<{ rotate: number }>`
  margin-left: 5px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  svg {
    border-radius: 10px;
    margin-top: 6px;
    background-color: white;
    transform: rotate(${({ rotate }) => rotate * 90}deg);

    cursor: pointer;
  }
`;

export default {
  Container,
  Boats,
  Commands,
};
