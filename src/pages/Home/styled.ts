import { Container, Tabs } from "@chakra-ui/react";
import { Form as FormikForm } from "formik";
import styled from "styled-components";

const ColoredBackground = styled.div`
  background-color: #ade5d5;
`;

const Form = styled(FormikForm)`
  display: flex;

  flex-direction: column;
`;

const WelcomeTabs = styled(Tabs)`
  background-image: url("./welcome-tab.gif"),
    linear-gradient(180deg, #57adfb 50%, #3b68d0 50%);

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  border-radius: 32px;

  z-index: 10;
`;

const WelcomeContainer = styled(Container)``;

export default {
  Form,
  ColoredBackground,
  WelcomeContainer,
  WelcomeTabs,
};
