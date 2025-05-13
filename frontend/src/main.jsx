import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./Components/ui/provider.jsx";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ChatProvider>
  //   <BrowserRouter>
  //     <ChakraProvider>
  //       <App />
  //     </ChakraProvider>
  //   </BrowserRouter>
  // </ChatProvider>
  <BrowserRouter>
    <Provider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </Provider>
  </BrowserRouter>
);
