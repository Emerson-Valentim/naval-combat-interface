import React from "react";

import Styled from "./styled";

const HomeInput = (props: any) => {
  return (
    <Styled.WhiteBackgroundInput
      mb={4}
      focusBorderColor="green.500"
      variant="filled"
      {...props}
    />
  );
};

export default HomeInput;
