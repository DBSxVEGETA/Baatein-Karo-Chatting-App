import React, { useEffect } from "react";
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser, LuLogIn } from "react-icons/lu";
import Login from "../Components/Authentication/Login.jsx";
import SignUp from "../Components/Authentication/SignUp.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box d="flex" justifyContent="center" bg="white" w="100%" m="30px 0 15px 0" p="2" borderRadius="10px">
        <Text fontSize="4xl" fontFamily="Work Sans" textAlign="center" color="black" fontWeight="semibold">
          Baatein Karo
        </Text>
      </Box>
      <Box bg="white" p="3" w="100%" borderRadius="10px">
        <Tabs.Root variant="plain" colorScheme="blue">
          <Tabs.List bg="white" p="0" width="100%" borderRadius="20px">
            <Tabs.Trigger value="login" width="50%" fontSize="md" color="black">
              <LuLogIn />
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="signup" width="50%" fontSize="md" color="black">
              <LuUser />
              SignUp
            </Tabs.Trigger>
            <Tabs.Indicator rounded="20px" bg="lightSkyBlue" />
          </Tabs.List>
          <Tabs.Content value="login" color="black">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="signup" color="black">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default HomePage;
