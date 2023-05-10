import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Provider from "./Context/Provider";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </Provider>
);
