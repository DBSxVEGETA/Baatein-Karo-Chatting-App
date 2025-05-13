import { Button, Field, Fieldset, Group, Show, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import React from "react";
// import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  // const toast = useToast();
  // const history = useHistory();

  const handleClickForPassword = () => setShow(!show);
  const handleClickForConfirmPassword = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      // toast({
      //   title: "Please select and image!",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "vegeta");
      fetch("https://api.cloudinary.com/v1_1/vegeta/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      // toast({
      //   title: "Please select and image!",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      // toast({
      //   title: "Please fill all the details",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      // toast({
      //   title: "Passwords does not match",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: bottom,
      // });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("http://localhost:5000/api/user/register", { name, email, password, pic }, config);
      // toast({
      //   title: "Registration Successful",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      // history.push("/chats");
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: error.response?.data?.message || error.message || "Something went wrong",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root id="firstName" isrequired="true">
            <Field.Label fontSize={13}>Name</Field.Label>
            <Input placeholder="Enter your name" h="25px" fontSize={13} onChange={(e) => setName(e.target.value)} />
          </Field.Root>

          <Field.Root id="email" isrequired="true">
            <Field.Label fontSize={13}>Email</Field.Label>
            <Input placeholder="Enter your email" h="25px" fontSize={13} onChange={(e) => setEmail(e.target.value)} />
          </Field.Root>

          <Field.Root id="password" isrequired="true">
            <Field.Label fontSize={13}>Password</Field.Label>
            <Group attached w="full">
              <Input type={show ? "text" : "password"} placeholder="Enter your password" h="25px" fontSize={13} onChange={(e) => setPassword(e.target.value)} />
              <Button h="25px" w="10px" fontSize={13} backgroundColor="#696969" color="white" onClick={handleClickForPassword}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Field.Root id="confirmPassword" isrequired="true">
            <Field.Label fontSize={13}>Confirm Password</Field.Label>
            <Group attached w="full">
              <Input type={show ? "text" : "password"} placeholder="Confirm password" h="25px" fontSize={13} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button h="25px" w="10px" fontSize={13} backgroundColor="#696969" color="white" onClick={handleClickForConfirmPassword}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Field.Root id="pic">
            <Field.Label fontSize={13}>Upload your picture</Field.Label>
            <Input type="file" p="0" h="25px" fontSize={13} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
          </Field.Root>
          <Button w="100%" h="25px" fontSize={13} bg="dodgerBlue" onClick={submitHandler} isLoading={loading}>
            Sign Up
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default SignUp;
