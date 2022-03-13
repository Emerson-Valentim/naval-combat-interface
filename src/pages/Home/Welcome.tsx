import React from "react";

import { Tab, TabList, TabPanel, Tabs, TabPanels } from "@chakra-ui/react";

import SignIn from "./SignIn";
import SignUp from "./SingUp";

const Welcome: React.FC = () => {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Login</Tab>
        <Tab>Registrar</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{<SignIn />}</TabPanel>
        <TabPanel>{<SignUp />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Welcome;
