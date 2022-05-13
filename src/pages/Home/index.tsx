import React from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Image,
  Box,
} from "@chakra-ui/react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Styled from "./styled";

const Welcome: React.FC = () => {
  return (
    <>
      <Styled.ColoredBackground>
        <Styled.WelcomeContainer
          width="100vw"
          height="100vh"
          maxWidth="70ch"
          display="flex"
        >
          <Styled.WelcomeTabs
            width="100vw"
            alignSelf="center"
            justifySelf="center"
            variant="soft-rounded"
            flexGrow={1}
            padding={8}
            size="sm"
            isFitted
          >
            <TabList>
              <Tab>Login</Tab>
              <Tab>Registrar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{<SignIn />}</TabPanel>
              <TabPanel>{<SignUp />}</TabPanel>
            </TabPanels>
          </Styled.WelcomeTabs>
        </Styled.WelcomeContainer>
      </Styled.ColoredBackground>
      <Box position="fixed" bottom={0}>
        <Image src="./welcome.gif" width="100vw" />
      </Box>
    </>
  );
};

export default Welcome;
