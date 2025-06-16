import { Button, CloseButton, Drawer, Portal, Text, Group, Input } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { Tooltip } from "../ui/tooltip";
import { IoSearch } from "react-icons/io5";

const SearchDrawer = () => {
  const { user } = ChatState();

  return (
    <Drawer.Root placement="start">
      <Tooltip showArrow content="Search user to chat" openDelay={200} closeDelay={100}>
        <Drawer.Trigger asChild>
          <Button variant="ghost" borderRadius="15px" bg="white" _hover={{ bg: "#aed6f1" }}>
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
                <Input flex="1" placeholder="Search by name or email" />
                <Button bg="bg.subtle" variant="outline">
                  <IoSearch color="white" />
                </Button>
              </Group>
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
