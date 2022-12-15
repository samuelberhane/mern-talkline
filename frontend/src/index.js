import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./posts.css";
import { UserContextProvider } from "./context/UserContext";
import { PostContextProvider } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
