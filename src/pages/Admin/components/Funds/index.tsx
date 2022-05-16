import React from "react";

import List from "./components/List";

import Styled from "./styled";

const Credits: React.FC = () => {
  return (
    <Styled.Box p={5} borderRadius={10}>
      <List />
    </Styled.Box>
  );
};

export default Credits;
