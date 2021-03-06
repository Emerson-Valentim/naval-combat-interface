import { Box } from "@chakra-ui/react";
import { Form } from "formik";
import styled from "styled-components";

const FormikForm = styled(Form)`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const MediaBox = styled(Box)`
  width: 100%;

  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 12px;
  overflow-y: scroll;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  div {
    width: 100%;
  }
`;

const Buttons = styled(Box)`
  display: flex;
  width: 100%;

  align-self: baseline;
  justify-content: end;

  margin-top: 16px;

  button {
    width: 20%;

    :last-child {
      margin-left: 8px;
    }
  }
`;

export default {
  MediaBox,
  InputContainer,
  FormikForm,
  Buttons,
};
