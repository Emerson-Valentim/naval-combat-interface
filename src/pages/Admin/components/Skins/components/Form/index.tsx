import { useMutation } from "@apollo/client";
import { Divider, FormLabel, Input } from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { Formik, useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { Skin } from "../..";
import Button from "../../../../../../components/Button";
import UploadFile, {
  AcceptedFiles,
  FileData,
} from "../../../../../../components/UploadFile";
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

const imageAlias = [
  "avatar",
  "scenario",
  "ship1",
  "ship2",
  "ship3",
  "ship4",
  "ship5",
];

const soundAlias = ["voiceYes", "voiceNo"];

const Form: React.FC<{
  skin?: Skin;
  resetSkin: () => void;
}> = ({ skin: incomingSkin, resetSkin }) => {
  const [skin, setSkin] = useState<Skin>();
  const [isEdit, setEdit] = useState(!!skin);

  const [files, setFiles] = useState<{
    [key: string]: FileData;
  }>({});
  const [medias, setMedias] = useState<{ sounds: any; images: any }>();

  const [rerender, updateRerender] = useState(0);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  const MEDIA_DICTIONARY: {
    label: string;
    accept: AcceptedFiles;
    prop: any;
  }[] = useMemo(() => {
    return [
      {
        label: "Avatar",
        accept: "image",
        prop: "avatar",
      },
      {
        label: "Cenário",
        accept: "image",
        prop: "scenario",
      },
      {
        label: "Barco 2x1",
        accept: "image",
        prop: "ship1",
      },
      {
        label: "Barco 3x1",
        accept: "image",
        prop: "ship2",
      },
      {
        label: "Barco 4x1",
        accept: "image",
        prop: "ship3",
      },
      {
        label: "Barco 5x1",
        accept: "image",
        prop: "ship4",
      },
      {
        label: "Barco 6x2",
        accept: "image",
        prop: "ship5",
      },
      {
        label: "Voz - Sim",
        accept: "audio",
        prop: "voiceYes",
      },
      {
        label: "Voz - Não",
        accept: "audio",
        prop: "voiceNo",
      },
    ];
  }, []);

  useEffect(() => {
    setSkin(incomingSkin);
    setEdit(!!incomingSkin);
  }, [incomingSkin]);

  useEffect(() => {
    if (skin) {
      Object.entries(skin).forEach(([key, value]) => {
        setFieldValue(key === "name" ? "packageName" : key, value);
      });
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

      setFiles({});
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
    },
    onSubmit: async ({ packageName, cost }) => {
      setFullscreenLoading(true);

      const input: any = {
        packageName: packageName,
        cost: cost,
      };

      const images: any = {};
      const sounds: any = {};

      Object.entries(files).forEach(([key, value]) => {
        if (value) {
          if (imageAlias.includes(key)) {
            images[key] = {
              filename: `${key}.${value.type}`,
              base64: value.base64,
            };
          }

          if (soundAlias.includes(key)) {
            sounds[key] = {
              filename: `${key}.${value.type}`,
              base64: value.base64,
            };
          }
        }
      });

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
          {MEDIA_DICTIONARY.map((item, index) => (
            <UploadFile
              key={index}
              label={item.label}
              accept={item.accept}
              onUpload={(value) => {
                files[item.prop] = value;

                setFiles(files);
              }}
              // @ts-expect-error prop cant be typed
              src={isEdit && skin ? skin[item.prop] : ""}
              rerender={rerender}
            />
          ))}
        </Styled.MediaBox>
        <Styled.Buttons>
          <Button
            disabled={addLoading || updateLoading}
            onClick={() => {
              setFiles({});
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
            disabled={isEdit ? updateLoading : addLoading}
          >
            {skin ? "Atualizar" : "Cadastrar"}
          </Button>
        </Styled.Buttons>
      </Styled.FormikForm>
    </Formik>
  );
};

export default Form;
