import { VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h="1.5rem" bg="white" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        w="100%"
        marginTop="15"
        colorScheme="blue"
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        w="100%"
        colorScheme="red"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
      >
        Get Guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
