import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";

import Button from "../../../../components/Button";
import FullscreenLoadingContext from "../../../../context/Loading";
import UserContext from "../../../../context/User";

const BUY_SKIN = gql`
  mutation buySkin($input: BuySkinInput!) {
    buySkin(input: $input)
  }
`;

const BuySkinButton: React.FC<{
  disabled: boolean;
  id: string;
}> = ({ disabled, id }) => {
  const [buySkin, { loading }] = useMutation(BUY_SKIN);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { refetch } = useContext(UserContext);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <Button
      disabled={disabled}
      onClick={async () => {
        await buySkin({
          variables: {
            input: {
              skinId: id,
            },
          },
        });

        await refetch();
      }}
    >
      <BsCartCheck />
    </Button>
  );
};

export default BuySkinButton;
