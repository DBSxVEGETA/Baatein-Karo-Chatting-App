import { InputGroup, VStack } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { Field, Fieldset, Input, Button, Group } from "@chakra-ui/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import React, { useState } from "react";
// import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  // const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toaster.warning({
        title: "Please enter correct email or password",
        // status: "warning",
        duration: 5000,
        // isClosable: true,
        action: {
          label: "X",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("http://localhost:5000/api/user/login", { email, password }, config);
      toaster.success({
        title: "User logged in successfully",
        // status: "success",
        duration: 5000,
        // isClosable: true,
        action: {
          label: "X",
        },
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toaster.error({
        title: "Error Occured!",
        description: error.response?.data?.message || error.message || "Something went wrong",
        // status: "error",
        duration: 5000,
        // isClosable: true,
        action: {
          label: "X",
        },
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root isrequired="true">
            <Field.Label fontSize={13}>Email</Field.Label>
            <Input
              h="25px"
              fontSize={13}
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Field.Root>
          <Field.Root isrequired="true">
            <Field.Label fontSize={13}>Password</Field.Label>
            <Group attached w="full">
              <Input
                h="25px"
                fontSize={13}
                type={show ? "text" : "password"}
                flex="1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button bg="bg.subtle" h="25px" w="10px" backgroundColor="#696969" variant="outline" onClick={handleClick}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Button w="100%" h="30px" fontSize={13} marginTop="9px" bg="dodgerBlue" onClick={submitHandler} isLoading={loading}>
            Login
          </Button>
          <Button
            w="100%"
            h="30px"
            fontSize={13}
            bg="red"
            onClick={() => {
              setEmail("guest@gmail.com");
              setPassword("123456");
            }}
          >
            Get Guest user credentials
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default Login;
