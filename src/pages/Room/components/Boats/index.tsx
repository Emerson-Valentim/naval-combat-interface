import { Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

import Styled from "./styled";

export type Direction = "DOWN" | "LEFT" | "UP" | "RIGHT";

const DIRECTIONS: Direction[] = ["UP", "RIGHT", "DOWN", "LEFT"];

const BOAT_PROPS = [
  {
    name: "ship1",
    size: 1,
  },
  {
    name: "ship2",
    size: 2,
  },
  {
    name: "ship3",
    size: 3,
  },
  {
    name: "ship4",
    size: 4,
  },
  {
    name: "ship5",
    size: 5,
  },
];

const Boats: React.FC<{
  currentSkin: {
    ship1: string;
    ship2: string;
    ship3: string;
    ship4: string;
    ship5: string;
  };
  direction: Direction;
  onBoatClick: ({ name, size }: { name: string; size: number }) => void;
  onBoatRotate: (direction: Direction) => void;
}> = ({ currentSkin, onBoatClick, onBoatRotate, direction }) => {
  const rotateBoat = () => {
    const currentDirection = DIRECTIONS.indexOf(direction);

    const shouldResetDirection = currentDirection + 1 > DIRECTIONS.length - 1;

    const newDirection = shouldResetDirection
      ? DIRECTIONS[0]
      : DIRECTIONS[currentDirection + 1];

    onBoatRotate(newDirection);
  };

  return (
    <Styled.Container>
      <Styled.Boats>
        {BOAT_PROPS.map((boat) => (
          <Image
            key={boat.name}
            // @ts-expect-error need to type this keys
            src={currentSkin[boat.name]}
            onClick={() => onBoatClick(boat)}
          />
        ))}
      </Styled.Boats>
      <Styled.Commands rotate={DIRECTIONS.indexOf(direction)}>
        <AiOutlineArrowUp size={40} onClick={rotateBoat} />
      </Styled.Commands>
    </Styled.Container>
  );
};

export default Boats;
