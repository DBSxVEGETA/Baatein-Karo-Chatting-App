import React from "react";
import { Container, Box, Text, Center } from "@chakra-ui/react";
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
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work Sans" textAlign="center">
          Baatein Karo
        </Text>
      </Box>
    </Container>
  );
};

export default HomePage;
