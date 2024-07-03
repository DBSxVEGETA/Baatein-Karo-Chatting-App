import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import ChatPage from "./Components/Pages/ChatPage";

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
};

export default App;
