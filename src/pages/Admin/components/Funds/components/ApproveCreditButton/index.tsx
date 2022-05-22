import { useMutation } from "@apollo/client";
import { gql } from "apollo-boost";
import React, { useContext, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";

import Button from "../../../../../../components/Button";
import FullscreenLoadingContext from "../../../../../../context/3";

const APPROVE_CREDIT = gql`
  mutation approveFunds($input: ApproveFundsInput!) {
    approveFunds(input: $input)
  }
`;

const ApproveCreditButton: React.FC<{ id: string }> = ({ id }) => {
  const [approveCredit, { loading }] = useMutation(APPROVE_CREDIT);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  return (
    <Button
      onClick={async () => {
        await approveCredit({
          variables: {
            input: {
              id,
            },
          },
        });
      }}
    >
      <BsCheckLg color="black" />
    </Button>
  );
};

export default ApproveCreditButton;
