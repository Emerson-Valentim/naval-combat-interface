import styled from "styled-components";

import { TileStatus } from "../..";

const STATE_DICTIONARY: { [key in TileStatus]: string } = {
  EMPTY: "/water.jpeg",
  DESTROYED: "/explosion.png",
  MISSED: "/bomb.jpeg",
  FILLED: "red",
};

const Row = styled.div`
  display: flex;
`;

const Matrix = styled.div`
  display: block;
`;

const Tile = styled.div<{
  status: TileStatus;
  size: number;
  disabled?: boolean;
}>`
  height: ${({ size }) => size * 30}px;
  width: ${({ size }) => size * 30}px;
  padding: 2px;
  margin: 1px;

  background: url(${({ status }) => STATE_DICTIONARY[status] ?? "pink"});
  background-size: cover;

  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
`;

export default {
  Row,
  Tile,
  Matrix,
};