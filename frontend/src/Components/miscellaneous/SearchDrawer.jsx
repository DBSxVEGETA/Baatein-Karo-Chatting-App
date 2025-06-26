import { useState } from "react";
import { Button, CloseButton, Drawer, Portal, Text, Group, Input, Spinner } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { Tooltip } from "../ui/tooltip";
import { IoSearch } from "react-icons/io5";
import { toaster } from "../ui/toaster";
import ChatLoading from "../ChatLoading";
import axiosApi from "../../config/axiosConfig";
import UserListItem from "../UserAvatar/UserListItem";

const SearchDrawer = () => {
  const { user, setSelectedChat } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const handleSearch = async () => {
    if (!search) {
      toaster.warning({
        title: "Please enter something in search",
        duration: 5000,
        action: {
          label: "X",
        },
      });
      return;
    }

    try {
      setLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };

      const { data } = await axiosApi.get(`http://localhost:5000/api/user/searchUsers?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toaster.error({
        title: "Error Occured!",
        description: error.response?.data?.message || error.message || "Failed to load the search results",
        duration: 5000,
        action: {
          label: "X",
        },
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axiosApi.post("http://localhost:5000/api/chat", { userId }, config);

      if (!chats.find((chat) => chat._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toaster.error({
        title: "Error fetching the chat",
        description: error.response?.data?.message || error.message || "Failed to load the chat",
        duration: 5000,
        action: {
          label: "X",
        },
      });
    }
  };

  return (
    <Drawer.Root placement="start">
      <Tooltip showArrow content="Search user to chat" openDelay={200} closeDelay={100}>
        <Drawer.Trigger asChild>
          <Button variant="ghost" borderRadius="15px" bg="white" _hover={{ bg: "#9a9bfc" }}>
            <IoSearch color="black" />
            <Text display={{ base: "none", md: "flex" }} px="2" color="black" fontSize="md">
              Search User
            </Text>
          </Button>
        </Drawer.Trigger>
      </Tooltip>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Search Users</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Group attached w="full" maxW="sm">
                <Input
                  flex="1"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button bg="bg.subtle" variant="outline" onClick={handleSearch}>
                  <IoSearch color="white" />
                </Button>
              </Group>
              {loading ? <ChatLoading /> : searchResult?.map((user) => <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />)}
              {loadingChat && <Spinner ml="auto" display="flex" size="sm" />}
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SearchDrawer;
