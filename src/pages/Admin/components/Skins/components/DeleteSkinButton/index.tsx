import { useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";

import Button from "../../../../../../components/Button";
import FullscreenLoadingContext from "../../../../../../context/Loading";

const DELETE_SKIN = gql`
  mutation removeSkin($input: RemoveSkinInput!) {
    removeSkin(input: $input)
  }
`;

const DeleteSkinButton: React.FC<{
  id: string;
  refetch: () => void;
}> = ({ id, refetch }) => {
  const [removeSkin, { loading }] = useMutation(DELETE_SKIN);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <Button
      onClick={async () => {
        await removeSkin({
          variables: {
            input: {
              skinId: id,
            },
          },
        });

        await refetch();
      }}
    >
      <DeleteIcon />
    </Button>
  );
};

export default DeleteSkinButton;
