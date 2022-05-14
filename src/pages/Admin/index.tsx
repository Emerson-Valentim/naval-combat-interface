import React from "react";

import Credits from "./components/Credits";
import Skins from "./components/Skins";
import Users from "./components/Users";
import Styled from "./styled";

const Admin = () => {
  return (
    <Styled.Container>
      <Users />
      <Credits />
      <Styled.SkinContainer>
        <Skins />
      </Styled.SkinContainer>
    </Styled.Container>
  );
};

export default Admin;
