import {
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

type AcceptedFiles = "audio" | "image";

export interface FileData {
  base64: string;
  type: string;
}

const Renders = {
  audio: (src: string) => <audio controls src={src} />,
  image: (src: string) => <Image src={src} />,
};

const UploadFile: React.FC<{
  base64?: string;
  type?: string;
  label: string;
  accept: AcceptedFiles;
  onUpload: (fileData: FileData) => void;
}> = ({
  label,
  accept,
  onUpload,
  base64: incomingBase64,
  type: incomingType,
}) => {
  const [type, setType] = useState(incomingType);
  const [base64, setBase64] = useState(incomingBase64);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type && base64) {
      onUpload({
        base64,
        type,
      });
    }
  }, [type, base64]);

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftAddon width={24} height={10}>
          {label}
        </InputLeftAddon>
        <Input
          id="file"
          type="file"
          disabled={loading}
          placeholder="phone number"
          padding={1}
          accept={`${accept}/*`}
          onChange={async (event) => {
            setLoading(true);
            const files = event?.target?.files;

            if (files?.length) {
              const file = files[0];
              const type = file.type.split("/")[1];

              const base64 = await getBase64(file);

              setBase64(base64);
              setType(type);
            }

            setLoading(false);
          }}
        />
      </InputGroup>
      {base64 ? Renders[accept](base64) : null}
    </Stack>
  );
};

export default UploadFile;
