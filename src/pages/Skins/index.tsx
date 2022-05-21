import React from "react";

import List from "./components/List";
import Request from "./components/Request";
import Styled from "./styled";

const Skins: React.FC = () => {
  return (
    <Styled.Box borderRadius={10}>
      <List />
      <Request />
    </Styled.Box>
  );
};

export default Skins;
