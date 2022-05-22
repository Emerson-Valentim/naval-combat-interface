import { useMutation } from "@apollo/client";
import {
  FormLabel,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { useFormik, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";

import FullscreenLoadingContext from "../../../../context/3";
import HomeInput from "../Input";

import Styled from "./styled";

type CreateStatus = "success" | "error";

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      username
    }
  }
`;

const STATUS_DICTIONARY: {
  [key in CreateStatus]: {
    title: string;
    message: string;
  };
} = {
  success: {
    title: "Usuário criado com sucesso!",
    message: "Agora é só realizar o login e se divertir!",
  },
  error: {
    title: "Poxa, tivemos um erro",
    message: "Verifique as informações que você enviou e tente novamente.",
  },
};

const SignUp: React.FC = () => {
  const [status, setStatus] = useState<CreateStatus | "">("");
  const [createUser, { loading, data, error }] =
    useMutation(CREATE_USER_MUTATION);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    if (data || error) {
      setFullscreenLoading(false);

      setStatus(!error ? "success" : "error");
    }
  }, [data, error]);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  const { initialValues, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "email@email.com",
      password: "password",
      username: "username",
    },
    onSubmit: (values): void => {
      setStatus("");
      createUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
            username: values.username,
          },
        },
      });
    },
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit as () => void}>
      <Styled.Form>
        <FormLabel htmlFor="email">Email</FormLabel>
        <HomeInput
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormLabel htmlFor="username">Apelido</FormLabel>
        <HomeInput
          id="username"
          type="text"
          value={values.username}
          onChange={handleChange}
        />
        <FormLabel htmlFor="password">Senha</FormLabel>
        <HomeInput
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button mt={4} type="submit" id="sign-up-submit">
          Registrar
        </Button>
        {status && (
          <Alert
            status={status}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            alignSelf="center"
            borderRadius={6}
            width="sm"
            mt={2}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {STATUS_DICTIONARY[status].title}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {STATUS_DICTIONARY[status].message}
            </AlertDescription>
          </Alert>
        )}
      </Styled.Form>
    </Formik>
  );
};

export default SignUp;
