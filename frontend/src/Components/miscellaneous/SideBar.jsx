import React, { useState } from "react";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import { Tooltip } from "../../Components/ui/tooltip";
import { IoSearch } from "react-icons/io5";
import { ChatState } from "../../Context/ChatProvider";
import { LuUserRound } from "react-icons/lu";

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
          <Button variant="ghost" borderRadius="15px" bg="white" _hover={{ bg: "#aed6f1", fontcolor: "white" }}>
            <IoSearch color="black" />
            <Text display={{ base: "none", md: "flex" }} px="2" color="black" fontSize="md">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans" color="black">
          Baatein-Karo
        </Text>
      </Box>
    </Box>
  );
};

export default SideBar;
