import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button";

const AdminButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button width="100px" type="submit" onClick={() => navigate("/admin")}>
      Configurar
    </Button>
  );
};

export default AdminButton;
