import React from "react";
// eslint-disable-next-line import/named
import { Button as UIButton, ButtonProps } from "@chakra-ui/react";

const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <UIButton onClick={onClick} {...props}>
      {children}
    </UIButton>
  );
};

export default Button;
