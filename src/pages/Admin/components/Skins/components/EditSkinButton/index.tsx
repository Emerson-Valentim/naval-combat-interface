import { EditIcon } from "@chakra-ui/icons";
import React from "react";

import Button from "../../../../../../components/Button";

const EditSkinButton: React.FC<{
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick: Function;
  index: number;
}> = ({ onClick, index }) => {
  return (
    <Button
      onClick={() => {
        onClick(index);
      }}
    >
      <EditIcon />
    </Button>
  );
};

export default EditSkinButton;
