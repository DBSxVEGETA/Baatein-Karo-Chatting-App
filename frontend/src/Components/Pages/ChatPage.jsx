import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  // to store the data we are using usestate
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/chats");
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
