import { Button, Field, Fieldset, Group, Show, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import React from "react";
import { toaster } from "../ui/toaster";
import axiosApi from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();

  const handleClickForPassword = () => setShow(!show);
  const handleClickForConfirmPassword = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toaster.warning({
        title: "Please select an image!",
        duration: 5000,
        action: {
          label: "X",
        },
      });
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
      toaster.warning({
        title: "Please select an image!",
        duration: 5000,
        action: {
          label: "X",
        },
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toaster.warning({
        title: "Please fill all the details",
        duration: 5000,
        action: {
          label: "X",
        },
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toaster.warning({
        title: "Passwords does not match",
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

      const { data } = await axiosApi.post("http://localhost:5000/api/user/register", { name, email, password, pic }, config);
      toaster.success({
        title: "Successfully registered the user",
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
          <Field.Root id="firstName" isrequired="true">
            <Field.Label fontSize="md">
              Name <span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Input required placeholder="Enter your name" fontSize="md" onChange={(e) => setName(e.target.value)} />
          </Field.Root>

          <Field.Root id="email" isrequired="true">
            <Field.Label fontSize="md">
              Email<span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Input required placeholder="Enter your email" fontSize="md" onChange={(e) => setEmail(e.target.value)} />
          </Field.Root>

          <Field.Root id="password" isrequired="true">
            <Field.Label fontSize="md">
              Password<span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Group attached w="full">
              <Input required type={show ? "text" : "password"} placeholder="Enter your password" fontSize="md" onChange={(e) => setPassword(e.target.value)} />
              <Button w="10px" fontSize="md" backgroundColor="gray" onClick={handleClickForPassword}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Field.Root id="confirmPassword" isrequired="true">
            <Field.Label fontSize="md">
              Confirm Password<span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Group attached w="full">
              <Input required type={show ? "text" : "password"} placeholder="Confirm password" fontSize="md" onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button w="10px" fontSize="md" backgroundColor="gray" onClick={handleClickForConfirmPassword}>
                {show ? <LuEyeClosed /> : <LuEye />}
              </Button>
            </Group>
          </Field.Root>
          <Field.Root id="pic">
            <Field.Label fontSize="md">Upload your picture</Field.Label>
            <Input type="file" p="1.5" fontSize="md" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
          </Field.Root>
          <Button w="100%" fontSize="md" bg="dodgerBlue" color="white" onClick={submitHandler} isLoading={loading}>
            Sign Up
          </Button>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  );
};

export default SignUp;
