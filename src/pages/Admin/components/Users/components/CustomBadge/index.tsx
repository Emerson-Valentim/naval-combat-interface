import { Badge } from "@chakra-ui/react";
import React from "react";

import { Roles } from "../../../../../../context/User";

const RoleStrings = {
  admin: "Administrador",
  user: "Usuário",
  maintainer: "Manutenção",
};

const CustomBadge: React.FC<{ roles: Roles[]; role: Roles }> = ({
  roles,
  role,
}) => {
  return (
    <Badge colorScheme={roles.includes(role) ? "green" : "red"}>
      {RoleStrings[role]}
    </Badge>
  );
};

export default CustomBadge;
