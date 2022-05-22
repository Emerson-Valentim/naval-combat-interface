import {
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";

import Styled from "./styled";

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export type AcceptedFiles = "audio" | "image";

export interface FileData {
  base64: string;
  type: string;
}

const Renders = {
  audio: (src: string) => <audio controls src={src} />,
  image: (src: string) => <Image src={src} />,
};

const UploadFile: React.FC<{
  src?: string;
  label: string;
  accept: AcceptedFiles;
  onUpload: (value: FileData) => any;
  rerender: number;
}> = ({ label, accept, onUpload, src: incomingSrc, rerender }) => {
  const [src, setSrc] = useState(incomingSrc);
  const [type, setType] = useState("");
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type && base64) {
      onUpload({
        base64: base64.split(",")[1],
        type,
      });
    }
  }, [type, base64]);

  useEffect(() => {
    setBase64("");
    setType("");
    setSrc("");
  }, [rerender]);

  useEffect(() => {
    setSrc(incomingSrc);
  }, [incomingSrc]);

  const uploadFile = useCallback(
    async (event) => {
      setLoading(true);
      const files = event?.target?.files;

      if (files?.length) {
        const file = files[0];
        const type = file.type.split("/")[1];

        const base64 = await getBase64(file);

        setType(type);
        setBase64(base64);
        setSrc(base64);
      }

      setLoading(false);
    },
    [type, base64, src]
  );

  return (
    <Styled.CustomStack
      spacing={4}
      mt={2}
      p={2}
      border="dashed"
      borderRadius="10"
    >
      <InputGroup justifyContent="center">
        <InputLeftAddon
          width={150}
          display="flex"
          justifyContent="center"
          height={10}
          borderRadius="10px !important"
        >
          {label}
          <FormLabel htmlFor={`${label}-file`}>
            <HiOutlineUpload fontSize={24} />
          </FormLabel>
        </InputLeftAddon>
        <Input
          id={`${label}-file`}
          type="file"
          disabled={loading}
          placeholder="phone number"
          padding={1}
          accept={`${accept}/*`}
          onChange={uploadFile}
        />
      </InputGroup>
      {src ? (
        <Styled.MediaPreview>{Renders[accept](src)}</Styled.MediaPreview>
      ) : null}
    </Styled.CustomStack>
  );
};

export default UploadFile;
