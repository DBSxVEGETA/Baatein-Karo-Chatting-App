import React, { useState } from "react";
import { Box, Tooltip, Button, Text, Menu, MenuButton, Avatar } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  return (
    <>
      <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
        <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans">
          Baatein-Karo
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <i class="fa-solid fa-bell" style={{ fontSize: 18, margin: 8 }}></i>
            </MenuButton>
            {/* <MenuList></MenuList> */}
            <Menu>
              <MenuButton as={Button}>
                <Avatar size="sm" cursor="pointer" />
              </MenuButton>
            </Menu>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideBar;
