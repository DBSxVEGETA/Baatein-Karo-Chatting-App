import React, { useState } from "react";
import { Avatar, Box, Button, Text, Menu, Portal, ButtonGroup, IconButton, Drawer, CloseButton } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileDialog from "./ProfileDialog";
import SearchDrawer from "./SearchDrawer";
import toaster from "../ui/toaster";
import axiosApi from "../../config/axiosConfig";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();

  const { user } = ChatState();

  const logoutHanlder = async () => {
    try {
      await axiosApi.get("http://localhost:5000/api/user/logout");
      localStorage.removeItem("userInfo");
      navigate("/");
      toaster.success({
        title: "User logged out successfully",
        duration: "5000",
        action: {
          label: "X",
        },
      });
    } catch (error) {
      toaster.error({
        title: "Error Occurred",
        description: error.response?.data?.message || error.message || "Something went wrong",
        duration: 5000,
        action: {
          label: "X",
        },
      });
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" borderRadius="15px" w="97%" p="5px 10px 5px 10px" borderWidth="2px">
        <SearchDrawer />
        <Text fontSize="2xl" fontFamily="work sans" color="black" fontWeight="semibold">
          Baatein Karo
        </Text>
        <Box display="flex" alignItems="center">
          <Menu.Root>
            <Menu.Trigger color="black" as={Button} size="sm" p={1} m={1}>
              <FaBell />
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="notifications">New Text File</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Root>
            <Menu.Trigger asChild>
              <ButtonGroup size="sm" attached>
                <Button color="black" bg="white">
                  <Avatar.Root size="md" variant="subtle">
                    <Avatar.Fallback name={user?.user.name} />
                    <Avatar.Image src={user?.user.pic} />
                  </Avatar.Root>
                </Button>
                <IconButton variant="ghost" color="black" borderRadius="15px" bg="white" _hover={{ bg: "#9a9bfc" }}>
                  <LuChevronDown />
                </IconButton>
              </ButtonGroup>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <ProfileDialog />
                <Menu.Separator />
                <Menu.Item value="logout" onClick={logoutHanlder}>
                  <Button variant="ghost" w="100%" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }}>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
