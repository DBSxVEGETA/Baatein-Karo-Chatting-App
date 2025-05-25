import React, { useState } from "react";
import { Avatar, Box, Button, Text, Menu, Portal, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Tooltip } from "../../Components/ui/tooltip";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { ChatState } from "../../Context/ChatProvider";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" borderRadius="15px" w="97%" p="5px 10px 5px 10px" borderWidth="2px">
        <Tooltip showArrow content="Search user to chat" openDelay={200} closeDelay={100}>
          <Button variant="ghost" borderRadius="15px" bg="white" _hover={{ bg: "#aed6f1" }}>
            <IoSearch color="black" />
            <Text display={{ base: "none", md: "flex" }} px="2" color="black" fontSize="md">
              Search User
            </Text>
          </Button>
        </Tooltip>

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
                  <Menu.Item value="new-txt">New Text File</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Root>
            <ButtonGroup size="sm" attached>
              <Button color="black" bg="white">
                <Avatar.Root size="md" variant="subtle">
                  <Avatar.Fallback name={user?.name} />
                  <Avatar.Image src={user?.pic} />
                </Avatar.Root>
              </Button>
              <IconButton variant="ghost" color="black" borderRadius="15px" bg="white" _hover={{ bg: "#aed6f1" }}>
                <LuChevronDown />
              </IconButton>
            </ButtonGroup>
          </Menu.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
