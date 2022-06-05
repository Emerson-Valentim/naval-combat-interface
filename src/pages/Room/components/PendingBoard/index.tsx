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

const initialBoat = { name: "", size: -1 };
const initialTile = { row: -1, column: -1 };

const PendingBoard: React.FC<{
  size: number;
  resetBoard: (positions?: any) => any;
  renderBoard: (positions?: any) => void;
  positions: any;
  roomId: string;
  currentPlayer: string;
}> = ({ size, resetBoard, renderBoard, positions, roomId, currentPlayer }) => {
  const { user } = useContext(UserContext);

  const [isTileValid, setIsTileValid] = useState(false);
  const [currentBoat, setCurrentBoat] = useState(initialBoat);
  const [currentTile, setCurrentTile] = useState(initialTile);
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
      let isBoatOnTopOfAnother = false;
      let isTileOnBoard = false;
      let isBoatOnBoard = false;

      const selectedPositions: number[][] = [];

      const { row, column } = currentTile;

      const isRowValid = row >= 0 && row < size;
      const isColumnValid = column >= 0 && column < size;

      isTileOnBoard = isRowValid && isColumnValid;

      if (isTileOnBoard) {
        isBoatOnBoard = validateIsBoatOnBoard(currentDirection, {
          row,
          column,
          size: currentBoat.size,
        });
      }

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

      setCurrentBoat(initialBoat);
      setCurrentTile(initialTile);
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
        <Button
          disabled={
            Object.values(selectedBoats).filter((value) => !!value).length <
              5 || currentPlayer !== user?.id
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
          {currentPlayer === user?.id ? "Posicionar" : "Aguarde"}
        </Button>
        <Boats
          direction={currentDirection}
          currentSkin={user?.skin?.current}
          onBoatClick={(boat) => {
            setCurrentTile({ column: -1, row: -1 });
            setCurrentBoat(boat);
          }}
          onBoatRotate={setCurrentDirection}
        />
      </>
    </>
  );
};

export default PendingBoard;
