import { ChatState } from "../Context/ChatProvider";
import NavBar from "../Components/miscellaneous/NavBar.jsx";
import MyChats from "../Components/MyChats.jsx";
import ChatBox from "../Components/ChatBox.jsx";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {/* {console.log(`user: ${user}`)} */}
      {user && <NavBar />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};
export default ChatPage;
