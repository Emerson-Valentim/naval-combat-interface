import React from "react";

import { TileStatus } from "../..";

import Styled from "./styled";

export type Position = { row: number; column: number };

const Tiles: React.FC<{
  positions: any[];
  size?: number;
  disabled?: boolean;
  onMouseEnter?: (position: Position) => void;
  onTileClick?: (position: Position) => void;
}> = ({ positions, onMouseEnter, onTileClick, size = 1, disabled = false }) => {
  return (
    <Styled.Matrix>
      {positions?.map((row: any, rowIndex: number) => {
        return (
          <Styled.Row key={`${rowIndex}`}>
            {Object.entries(row).map(([columnIndex, status]) => {
              const position = {
                row: rowIndex,
                column: +columnIndex,
              };

              return (
                <Styled.Tile
                  key={`${rowIndex}-${columnIndex}-${status}`}
                  status={status as TileStatus}
                  onClick={() => {
                    if (onTileClick) {
                      onTileClick(position);
                    }
                  }}
                  onMouseEnter={() => {
                    if (onMouseEnter) {
                      onMouseEnter(position);
                    }
                  }}
                  size={size}
                  disabled={disabled}
                />
              );
            })}
          </Styled.Row>
        );
      })}
    </Styled.Matrix>
  );
};

export default Tiles;
