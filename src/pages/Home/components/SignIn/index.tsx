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

import FullscreenLoadingContext from "../../../../context/Loading";
import Button from "../../../../components/Button";
import UserContext from "../../../../context/User";
import tokenStorage from "../../../../utils/token-storage";

import HomeInput from "../Input";

import Styled from "./styled";

const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      tokens {
        accessToken
        refreshToken
      }
      roles
    }
  }
`;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, { loading, data, error }] = useMutation(SIGN_IN_MUTATION);
  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );
  const { setAuthentication, setRoles } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      const { roles, tokens } = data.signIn;

      tokenStorage.set(JSON.stringify(tokens));

      setFullscreenLoading(false);
      setAuthentication(true);
      setRoles(roles);

      navigate("/lobby");
    }
  }, [data]);

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  const { initialValues, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        <Button
          mt={4}
          type="submit"
          id="sign-in-submit"
          disabled={loading || !values.email || !values.password}
        >
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
