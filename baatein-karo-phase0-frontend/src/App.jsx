import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { Toaster } from "./Components/ui/toaster";
import AuthProvider  from "./Context/AuthContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
