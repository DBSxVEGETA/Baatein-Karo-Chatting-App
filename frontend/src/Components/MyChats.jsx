import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { toaster } from "../Components/ui/toaster";
import axiosApi from "../config/axiosConfig";
import { Box, Button, Stack } from "@chakra-ui/react";
import { GrGroup } from "react-icons/gr";
import ChatLoading from "./ChatLoading";
import getSender from "../config/ChatLogics";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const { data } = await axiosApi.get("http://localhost:5000/api/chat");
      setChats(data);
    } catch (error) {
      toaster.error({
        title: "Error Occured!",
        description: error.response?.data?.message || error.message || "Failed to load the chats",
        duration: 5000,
        action: {
          label: "X",
        },
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  console.log(chats);

  return (
    <Box display={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="white" w={{ base: "100%", md: "30%" }} borderRadius="lg" borderWidth="1px">
      <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" display="flex" w="100%" justifyContent="space-between" alignItems="center" color="black">
        My Chats
        <Button display="flex" variant="solid" bg="#9a9bfc" fontSize={{ base: "17px", md: "10px", lg: "17px" }}>
          New Group Chat <GrGroup />
        </Button>
      </Box>
      <Box display="flex" flexDir="column" p={3} bg="#9a9bfc" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "9a9bfc" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {/* <Text>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</Text> */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
