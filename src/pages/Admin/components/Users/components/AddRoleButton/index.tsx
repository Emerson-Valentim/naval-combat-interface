import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
} from "@chakra-ui/react";
import { gql } from "apollo-boost";
import { Form, Formik, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { GrUserAdmin } from "react-icons/gr";

import Button from "../../../../../../components/Button";
import FullscreenLoadingContext from "../../../../../../context/Loading";
import UserContext, { Roles } from "../../../../../../context/User";
import CustomBadge from "../CustomBadge";

import Styled from "./styled";

const UPDATE_ROLES = gql`
  mutation updateRoles($input: UpdateRolesInput!) {
    updateRoles(input: $input)
  }
`;

const AddRoleButton: React.FC<{
  id: string;
  roles: Roles[];
  refetch: () => void;
  disabled: boolean;
}> = ({ id, roles: incomingRoles, refetch, disabled }) => {
  const [roles, setRoles] = useState<Roles[]>(incomingRoles);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [isLoading, setLoading] = useState(false);

  const { roles: agentRoles } = useContext(UserContext);

  const { setLoading: setFullscreenLoading } = useContext(
    FullscreenLoadingContext
  );

  const [updateRoles, { loading: isUpdateLoading }] = useMutation(UPDATE_ROLES);

  const isAdmin = roles.includes("admin");
  const isMaintainer = roles.includes("maintainer");

  const { initialValues, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      admin: isAdmin,
      maintainer: isMaintainer,
    },
    onSubmit: async (): Promise<void> => {
      await updateRoles({
        variables: {
          input: {
            userId: id,
            roles,
          },
        },
      });

      setModalOpen(false);

      await refetch();
    },
  });

  useEffect(() => {
    setFullscreenLoading(isUpdateLoading);
  }, [isUpdateLoading]);

  useEffect(() => {
    setRoles(incomingRoles);
  }, [incomingRoles]);

  useEffect(() => {
    setLoading(true);

    const newRoles: Roles[] = [];

    if (values.admin) {
      newRoles.push("admin");
    }

    if (values.maintainer) {
      newRoles.push("maintainer");
    }

    setRoles(newRoles);

    setLoading(false);
  }, [values]);

  return (
    <>
      <Button onClick={() => setModalOpen(true)} disabled={disabled}>
        <GrUserAdmin color="black" />
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        closeOnOverlayClick={!isUpdateLoading}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atualizar permissões</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit as () => void}
          >
            <Form>
              <ModalBody>
                <Styled.InputContainer>
                  <Switch
                    id="admin"
                    defaultChecked={isAdmin}
                    onChange={handleChange}
                    disabled={
                      isLoading ||
                      isUpdateLoading ||
                      !agentRoles.includes("admin")
                    }
                    marginRight={4}
                  />
                  <CustomBadge role="admin" roles={roles} />
                </Styled.InputContainer>
                <Styled.InputContainer>
                  <Switch
                    id="maintainer"
                    defaultChecked={isMaintainer}
                    onChange={handleChange}
                    disabled={
                      isLoading ||
                      isUpdateLoading ||
                      !agentRoles.includes("maintainer")
                    }
                    marginRight={4}
                  />
                  <CustomBadge role="maintainer" roles={roles} />
                </Styled.InputContainer>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="space-around">
                <Button
                  width="100px"
                  type="submit"
                  disabled={isLoading || isUpdateLoading}
                >
                  Atualizar
                </Button>
                <Button
                  width="100px"
                  onClick={() => setModalOpen(false)}
                  disabled={isLoading || isUpdateLoading}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRoleButton;
