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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/User";

import CreateRoomButton from "./components/CreateRoomButton";
import RoomList from "./components/RoomList";
import SignOut from "./components/SignOut";
import Skins from "./components/Skins";
import Styled from "./styled";

export default function withAction() {
  const { user, roles } = useContext(UserContext);
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
        <TabPanels>
          <TabPanel>
            <RoomList />
          </TabPanel>
          <TabPanel>
            <Skins />
          </TabPanel>
        </TabPanels>
      </Styled.Container>
    </Tabs>
  );
}
