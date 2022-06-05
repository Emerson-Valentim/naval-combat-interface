import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button";

import Styled from "./styled";

const GameOver: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { winner: boolean } };

  return (
    <Styled.Container>
      <Styled.Title>
        {state?.winner ? "Você venceu" : "Você Perdeu"}
      </Styled.Title>
      <Button onClick={() => navigate("/lobby")}>Voltar ao lobby</Button>
    </Styled.Container>
  );
};

export default GameOver;
