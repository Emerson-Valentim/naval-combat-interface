import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SocketContext from "../../context/Socket";

import UserContext from "../../context/User";

import Skins from "../Skins";

import CreateRoomButton from "./components/CreateRoomButton";
import RoomList from "./components/RoomList";
import SignOut from "./components/SignOut";
import Styled from "./styled";

export default function withAction() {
  const { socket } = useContext(SocketContext);
  const { user, roles, refetch: profile } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAdmin, setAdmin] = useState(false);
  const [isMaintainer, setMaintainer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = roles.includes("admin");
    const isMaintainer = roles.includes("maintainer");

    setAdmin(isAdmin);
    setMaintainer(isMaintainer);
  }, [roles]);

  useEffect(() => {
    socket.on("client:funds:approve", async () => {
      await profile();
    });

    return () => {
      socket.off("client:funds:approve");
    };
  }, []);

  return (
    <Tabs variant="unstyled">
      <Box px={6}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <TabList>
                <Tab>Lobby</Tab>
                <Tab>Skins</Tab>
              </TabList>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <CreateRoomButton />
            <Spacer marginRight={4} />
            <Menu>
              <MenuButton as={Button} minW={0} background="transparent">
                <Avatar
                  size={"sm"}
                  src={user?.skin?.current?.avatar}
                  border={isMaintainer ? "2px" : "transparent"}
                  style={{ borderColor: isMaintainer ? "blue" : "red" }}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text>Saldo R$: {(user?.balance / 100).toFixed(2)}</Text>
                </MenuItem>
                {isAdmin ? (
                  <MenuItem onClick={() => navigate("/admin")}>
                    Painel de controle
                  </MenuItem>
                ) : null}
                <SignOut />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Styled.Container>
        <TabPanels height="100%">
          <TabPanel height="100%">
            <RoomList />
          </TabPanel>
          <TabPanel height="100%">
            <Skins />
          </TabPanel>
        </TabPanels>
      </Styled.Container>
    </Tabs>
  );
}
