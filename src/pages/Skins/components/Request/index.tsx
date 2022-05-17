import { useMutation } from "@apollo/client";
import { FormLabel } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { Form, Formik, useFormik } from "formik";
import React, { useContext, useEffect } from "react";

import Button from "../../../../components/Button";
import FullscreenLoadingContext from "../../../../context/Loading";

import Styled from "./styled";

const REQUEST_FUNDS = gql`
  mutation requestFunds($input: RequestFundsInput!) {
    requestFunds(input: $input)
  }
`;

const Request: React.FC = () => {
  const [requestFunds, { loading }] = useMutation(REQUEST_FUNDS);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    setFullscreenLoading(loading);
  }, [loading]);

  const { handleSubmit, setFieldValue, initialValues, values } = useFormik({
    initialValues: {
      value: 0,
    },
    onSubmit: async (values: any) => {
      await requestFunds({
        variables: {
          input: {
            value: +values.value,
          },
        },
      });
    },
  });

  return (
    <Styled.Box p={5} borderRadius={10}>
      <Formik
        onSubmit={handleSubmit as () => void}
        initialValues={initialValues}
      >
        <Form>
          <FormLabel htmlFor="value">Valor R$</FormLabel>
          <Styled.Input
            id="value"
            defaultValue={0}
            placeholder="R$ 10.00"
            prefix="R$ "
            onValueChange={(values) => {
              const { value } = values;

              if (value.includes(".")) {
                setFieldValue(
                  "value",
                  value.replace("R$ ", "").replace(/\D/g, "")
                );
              }

              setFieldValue("value", +value * 100);
            }}
            thousandSeparator
          ></Styled.Input>
          <Button type="submit" marginTop={4} disabled={values.value <= 0}>
            Solicitar
          </Button>
        </Form>
      </Formik>
    </Styled.Box>
  );
};

export default Request;
