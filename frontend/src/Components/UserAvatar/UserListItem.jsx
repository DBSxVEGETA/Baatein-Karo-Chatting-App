import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#9a9bfc",
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mt={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar.Root size="sm" mr={2} variant="subtle" cursor="pointer">
        <Avatar.Fallback name={user?.name} />
        <Avatar.Image src={user?.pic} />
      </Avatar.Root>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
