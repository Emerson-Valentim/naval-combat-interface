import { useMutation } from "@apollo/client";
import { FormLabel, Input } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { Form, Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../../../components/Button";

import UploadFile, { FileData } from "../../../../components/UploadFile";
import FullscreenLoadingContext from "../../../../context/Loading";

import Styled from "./styled";

const ADD_SKIN = gql`
  mutation addSkin($input: AddSkinInput!) {
    addSkin(input: $input)
  }
`;

const Skins: React.FC<{ id?: string }> = ({ id }) => {
  const [voice, setVoice] = useState<FileData>();
  const [avatar, setAvatar] = useState<FileData>();
  const [scenario, setScenario] = useState<FileData>();

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    if (voice) {
      setFieldValue("voice", voice);
    }
  }, [voice]);

  useEffect(() => {
    if (avatar) {
      setFieldValue("avatar", avatar);
    }
  }, [avatar]);

  useEffect(() => {
    if (scenario) {
      setFieldValue("scenario", scenario);
    }
  }, [scenario]);

  useEffect(() => {
    if (id) {
      console.log(id);
    }
  }, [id]);

  const [addSkin, { loading }] = useMutation(ADD_SKIN);

  const {
    values,
    initialValues,
    resetForm,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      packageName: "",
      cost: 0,
      avatar,
      scenario,
      voice,
    },
    onSubmit: async (values) => {
      setFullscreenLoading(true);

      if (values.voice && values.avatar && values.scenario) {
        const input = {
          packageName: values.packageName,
          cost: values.cost,
          images: {
            avatar: {
              filename: `avatar.${values.avatar.type}`,
              base64: values.avatar.base64,
            },
            scenario: {
              filename: `scenario.${values.scenario.type}`,
              base64: values.scenario.base64,
            },
          },
          sounds: {
            voice: {
              filename: `voice.${values.voice.type}`,
              base64: values.voice.base64,
            },
          },
        };

        const options = {
          variables: {
            input,
          },
        };

        const isEdit = !!id;

        isEdit ? await addSkin(options) : await addSkin(options);

        setAvatar(undefined);
        setScenario(undefined);
        setVoice(undefined);

        resetForm();
      }

      setFullscreenLoading(false);
    },
  });

  return (
    <Styled.Container>
      <Formik
        onSubmit={handleSubmit as () => void}
        initialValues={initialValues}
      >
        <Form>
          <FormLabel htmlFor="packageName">Nome</FormLabel>
          <Input id="packageName" name="packageName" onChange={handleChange} />
          <FormLabel htmlFor="cost" defaultValue={0}>
            Valor
          </FormLabel>
          <Input id="cost" name="cost" type="number" onChange={handleChange} />
          <Styled.ImageContainer>
            <UploadFile label="Avatar" accept="image" onUpload={setAvatar} />
            <UploadFile label="Cenário" accept="image" onUpload={setScenario} />
            <UploadFile label="Voz" accept="audio" onUpload={setVoice} />
          </Styled.ImageContainer>
          <Button
            type="submit"
            disabled={
              loading ||
              !!Object.values(values).filter((value) => value !== 0 && !value)
                .length
            }
          >
            Cadastrar
          </Button>
        </Form>
      </Formik>
    </Styled.Container>
  );
};

export default Skins;
