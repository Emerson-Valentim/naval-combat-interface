import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import React, { useContext, useEffect, useState } from "react";

import UserContext from "../../../../context/User";
import Boats, { Direction } from "../Boats";
import Tiles from "../Tiles";

const INDIVIDUAL_SETUP = gql`
  mutation individualSetup($input: IndividualSetupInput!) {
    individualSetup(input: $input)
  }
`;

const isFilled = (value: string) => value === "FILLED";

const validateIsBoatOnBoard = (
  direction: Direction,
  { row, column, size }: any
) => {
  switch (direction) {
    case "UP":
      return row + 1 - size >= 0;
    case "DOWN":
      return size + row <= 10;
    case "LEFT":
      return column + 1 - size >= 0;
    case "RIGHT":
      return size + column <= 10;
  }
};

const DIRECTION_VALIDATORS = {
  UP: (positions: any, { row, column, index }: any, selectedPositions: any) => {
    if (isFilled(positions[row - index][column])) {
      return true;
    }
    selectedPositions.push([row - index, column]);
  },
  DOWN: (
    positions: any,
    { row, column, index }: any,
    selectedPositions: any
  ) => {
    if (isFilled(positions[row + index][column])) {
      return true;
    }
    selectedPositions.push([row + index, column]);
  },
  LEFT: (
    positions: any,
    { row, column, index }: any,
    selectedPositions: any
  ) => {
    if (isFilled(positions[row][column - index])) {
      return true;
    }
    selectedPositions.push([row, column - index]);
  },
  RIGHT: (
    positions: any,
    { row, column, index }: any,
    selectedPositions: any
  ) => {
    if (isFilled(positions[row][column + index])) {
      return true;
    }
    selectedPositions.push([row, column + index]);
  },
};

const PendingBoard: React.FC<{
  size: number;
  resetBoard: (positions?: any) => any;
  renderBoard: (positions?: any) => void;
  positions: any;
  roomId: string;
}> = ({ size, resetBoard, renderBoard, positions, roomId }) => {
  const { user } = useContext(UserContext);

  const [isTileValid, setIsTileValid] = useState(false);
  const [currentBoat, setCurrentBoat] = useState({ name: "", size: -1 });
  const [currentTile, setCurrentTile] = useState({ row: -1, column: -1 });
  const [selectedBoats, setSelectedBoats] = useState<any>({
    ship1: undefined,
    ship2: undefined,
    ship3: undefined,
    ship4: undefined,
    ship5: undefined,
  });
  const [currentDirection, setCurrentDirection] = useState<Direction>("UP");

  const [individualSetup] = useMutation(INDIVIDUAL_SETUP);

  useEffect(() => {
    if (
      currentTile &&
      currentBoat.name &&
      currentBoat.size &&
      currentDirection
    ) {
      const selectedPositions: number[][] = [];

      const { row, column } = currentTile;

      const isRowValid = row >= 0 && row < size;
      const isColumnValid = column >= 0 && column < size;

      const isTileOnBoard = isRowValid && isColumnValid;

      const isBoatOnBoard = validateIsBoatOnBoard(currentDirection, {
        row,
        column,
        size: currentBoat.size,
      });

      let isBoatOnTopOfAnother = false;

      for (let i = 0; i < currentBoat.size; i++) {
        if (isBoatOnBoard) {
          isBoatOnTopOfAnother =
            DIRECTION_VALIDATORS[currentDirection](
              positions,
              {
                row,
                column,
                index: i,
              },
              selectedPositions
            ) ?? false;
        }
      }

      if (isBoatOnBoard && !isBoatOnTopOfAnother) {
        setSelectedBoats((value: any) => {
          return {
            ...value,
            [currentBoat.name]: selectedPositions,
          };
        });
      }

      setIsTileValid(isTileOnBoard && isBoatOnBoard && !isBoatOnTopOfAnother);
    }
  }, [currentBoat, currentTile, currentDirection]);

  useEffect(() => {
    if (isTileValid) {
      const initialBoard = resetBoard();

      Object.values(selectedBoats).forEach((selectedPositions: any) => {
        if (selectedPositions) {
          selectedPositions.forEach(([row, column]: any) => {
            initialBoard[row][column] = "FILLED";
          });
        }
      });

      renderBoard(initialBoard);
    }
  }, [isTileValid, selectedBoats]);

  return (
    <>
      <Tiles
        positions={positions}
        size={2}
        disabled={false}
        onTileClick={setCurrentTile}
      />
      (
      <>
        <Boats
          direction={currentDirection}
          currentSkin={user?.skin?.current}
          onBoatClick={(boat) => {
            setCurrentTile({ column: -1, row: -1 });
            setCurrentBoat(boat);
          }}
          onBoatRotate={setCurrentDirection}
        />
        <Button
          disabled={
            Object.values(selectedBoats).filter((value) => !!value).length < 5
          }
          onClick={() =>
            individualSetup({
              variables: {
                input: {
                  roomId: roomId,
                  positions: Object.values(selectedBoats)
                    .flat(1)
                    .map(([row, column]: any) => ({ row, column })),
                },
              },
            })
          }
        >
          Posicionar
        </Button>
      </>
    </>
  );
};

export default PendingBoard;
