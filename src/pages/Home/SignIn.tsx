import React, { useContext, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import FullscreenLoadingContext from "../../context/loading/Loading";
import Button from "../../components/button/Button";
import UserContext from "../../context/user/User";
import tokenStorage from "../../utils/token-storage";

import Styled from "./styled";
import HomeInput from "./components/Input";

const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, { loading, data, error }] = useMutation(SIGN_IN_MUTATION);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { setAuthentication } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      tokenStorage.set(JSON.stringify(data.signIn));

      setFullscreenLoading(false);
      setAuthentication(true);

      navigate("/lobby");
    }
  }, [data]);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  const { initialValues, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "email@email.com",
      password: "password",
    },
    onSubmit: (values): void => {
      signIn({
        variables: {
          input: {
            email: values.email,
            password: values.password,
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
        <FormLabel htmlFor="password">Senha</FormLabel>
        <HomeInput
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button mt={4} type="submit" id="sign-in-submit">
          Entrar
        </Button>
        {error && (
          <Alert
            status="error"
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
              Poxa, tivemos um erro
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Verifique as informações que você enviou e tente novamente
            </AlertDescription>
          </Alert>
        )}
      </Styled.Form>
    </Formik>
  );
};

export default SignIn;
