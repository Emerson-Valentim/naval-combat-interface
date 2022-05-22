import { useMutation } from "@apollo/client";
import { Divider, FormLabel, Input } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";

import { Skin } from "../..";
import Button from "../../../../../../components/Button";
import UploadFile, { FileData } from "../../../../../../components/UploadFile";
import FullscreenLoadingContext from "../../../../../../context/Loading";

import Styled from "./styled";

const ADD_SKIN = gql`
  mutation addSkin($input: AddSkinInput!) {
    addSkin(input: $input) {
      id
    }
  }
`;

const UPDATE_SKIN = gql`
  mutation updateSkin($input: UpdateSkinInput!) {
    updateSkin(input: $input)
  }
`;

const Form: React.FC<{
  skin?: Skin;
  resetSkin: () => void;
}> = ({ skin: incomingSkin, resetSkin }) => {
  const [skin, setSkin] = useState<Skin>();
  const [isEdit, setEdit] = useState(!!skin);

  const [voice, setVoice] = useState<FileData>();
  const [avatar, setAvatar] = useState<FileData>();
  const [scenario, setScenario] = useState<FileData>();

  const [medias, setMedias] = useState<{ sounds: any; images: any }>();

  const [rerender, updateRerender] = useState(0);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  useEffect(() => {
    setSkin(incomingSkin);
    setEdit(!!incomingSkin);
  }, [incomingSkin]);

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
    if (skin) {
      setFieldValue("cost", skin.cost);
      setFieldValue("packageName", skin.name);
    }
  }, [skin]);

  const resetUploader = () => {
    updateRerender((a) => a + 1);
  };

  const [addSkin, { loading: addLoading }] = useMutation(ADD_SKIN, {
    onCompleted: async (data) => {
      setFullscreenLoading(true);

      if (medias) {
        for (const [section, sectionMedia] of Object.entries(medias)) {
          for (const [media, value] of Object.entries(sectionMedia)) {
            await updateSkin({
              variables: {
                input: {
                  id: data.addSkin.id,
                  [section]: {
                    [media]: value,
                  },
                },
              },
            });
          }
        }
      }

      await updateSkin({
        variables: {
          input: {
            id: data.addSkin.id,
            status: "ACTIVE",
          },
        },
      });

      setFullscreenLoading(false);
    },
  });
  const [updateSkin, { loading: updateLoading }] = useMutation(UPDATE_SKIN);

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

      const input: any = {
        packageName: values.packageName,
        cost: values.cost,
      };

      const images: any = {};
      const sounds: any = {};

      if (values.avatar) {
        images.avatar = {
          filename: `avatar.${values.avatar.type}`,
          base64: values.avatar.base64,
        };
      }

      if (values.scenario) {
        images.scenario = {
          filename: `scenario.${values.scenario.type}`,
          base64: values.scenario.base64,
        };
      }

      if (values.voice) {
        sounds.voice = {
          filename: `voice.${values.voice.type}`,
          base64: values.voice.base64,
        };
      }

      setMedias({ sounds, images });

      const operation = isEdit
        ? updateSkin({
            variables: {
              input: {
                id: skin!.id,
                cost: input.cost,
                name: input.packageName,
                images: Object.values(images).length ? images : undefined,
                sounds: Object.values(sounds).length ? sounds : undefined,
              },
            },
          })
        : addSkin({
            variables: {
              input,
            },
          });

      await operation;

      resetForm();
      resetSkin();
      resetUploader();

      setFullscreenLoading(false);
    },
  });

  return (
    <Formik onSubmit={handleSubmit as () => void} initialValues={initialValues}>
      <Styled.FormikForm>
        <Styled.InputContainer>
          <div>
            <FormLabel htmlFor="packageName">Nome</FormLabel>
            <Input
              id="packageName"
              name="packageName"
              onChange={handleChange}
              value={values.packageName}
              mr="-1"
            />
          </div>
          <div>
            <FormLabel htmlFor="cost">Valor</FormLabel>
            <Input
              id="cost"
              name="cost"
              type="number"
              onChange={handleChange}
              value={values.cost ?? 0}
              ml="1"
            />
          </div>
        </Styled.InputContainer>
        <Divider orientation="horizontal" mt={4} />
        <Styled.MediaBox>
          <UploadFile
            label="Avatar"
            accept="image"
            onUpload={setAvatar}
            src={isEdit ? skin?.avatar : ""}
            rerender={rerender}
          />
          <UploadFile
            label="Cenário"
            accept="image"
            onUpload={setScenario}
            src={isEdit ? skin?.scenario : ""}
            rerender={rerender}
          />
          <UploadFile
            label="Voz"
            accept="audio"
            onUpload={setVoice}
            src={isEdit ? skin?.voice : ""}
            rerender={rerender}
          />
        </Styled.MediaBox>
        <Styled.Buttons>
          <Button
            disabled={addLoading || updateLoading}
            onClick={() => {
              resetSkin();
              resetForm();
              resetUploader();
            }}
          >
            Limpar
          </Button>
          <Button
            justifySelf="baseline"
            type="submit"
            disabled={
              isEdit
                ? updateLoading
                : addLoading ||
                  !!Object.values(values).filter(
                    (value) => value !== 0 && !value
                  ).length
            }
          >
            {skin ? "Atualizar" : "Cadastrar"}
          </Button>
        </Styled.Buttons>
      </Styled.FormikForm>
    </Formik>
  );
};

export default Form;
