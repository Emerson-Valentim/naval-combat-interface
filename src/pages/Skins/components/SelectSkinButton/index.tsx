import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";
import { BiSelectMultiple } from "react-icons/bi";

import Button from "../../../../components/Button";
import FullscreenLoadingContext from "../../../../context/Loading";
import UserContext from "../../../../context/User";

const SELECT_SKIN = gql`
  mutation selectSkin($input: SelectSkinInput!) {
    selectSkin(input: $input)
  }
`;

const SelectSkinButton: React.FC<{
  disabled: boolean;
  current: boolean;
  id: string;
}> = ({ disabled, id, current }) => {
  const [selectSkin, { loading }] = useMutation(SELECT_SKIN);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { refetch } = useContext(UserContext);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <Button
      colorScheme={current ? "green" : undefined}
      disabled={disabled}
      onClick={async () => {
        await selectSkin({
          variables: {
            input: {
              skinId: id,
            },
          },
        });

        await refetch();
      }}
    >
      <BiSelectMultiple />
    </Button>
  );
};

export default SelectSkinButton;
