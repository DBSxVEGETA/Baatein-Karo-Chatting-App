import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../Components/Authentication/Login.jsx";
import SignUp from "../Components/Authentication/SignUp.jsx";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p="2"
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="15px"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work Sans" textAlign="center">
          Baatein Karo
        </Text>
      </Box>
      <Box bg="white" p="4" w="100%" borderRadius="15px" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
