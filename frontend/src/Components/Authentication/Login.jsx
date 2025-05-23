import { InputGroup, VStack } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { Field, Fieldset, Input, Button, Group } from "@chakra-ui/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
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
        duration: 5000,
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
        duration: 5000,
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
        duration: 5000,
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
            <Field.Label fontSize="md">
              Email<span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Input
              required
              fontSize="md"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Field.Root>
          <Field.Root isrequired="true">
            <Field.Label fontSize="md">
              Password<span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Group attached w="full">
              <Input
                required
                fontSize="md"
                type={show ? "text" : "password"}
                flex="1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button bg="bg.subtle" w="10px" backgroundColor="gray" onClick={handleClick}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Button w="100%" fontSize="md" color="white" marginTop="9px" bg="dodgerBlue" onClick={submitHandler} isLoading={loading}>
            Login
          </Button>
          <Button
            w="100%"
            fontSize="md"
            color="white"
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
