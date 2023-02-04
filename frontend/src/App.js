import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useGlobalUserContext } from "./context/UserContext";
import { useGlobalPostContext } from "./context/PostContext";
import TagsModal from "./components/tagsModal/TagsModal";
import { socketRoute } from "./utils/apiRoute";
import { io } from "socket.io-client";
import {
  Login,
  Profile,
  Register,
  Home,
  EditProfile,
  Chat,
} from "./pages/index";

const App = () => {
  const { user, dispatch: userDispatch } = useGlobalUserContext();
  const { userPost, showModal, allUsers } = useGlobalPostContext();
  const userId = user?.user?._id;
  const socket = useRef();

  // useEffect(() => {
  //   socket.current = io(socketRoute);
  //   userDispatch({ type: "SOCKET", payload: socket });
  //   socket.current?.emit("addUser", userId);
  //   socket.current?.on("getOnlineUsers", (usersArray) => {
  //     userDispatch({ type: "ONLINE_USERS", payload: usersArray });
  //   });
  // }, [userId]);

  // update local storage when user changes
  useEffect(() => {
    localStorage.setItem("talklineUser", JSON.stringify(user));
    localStorage.setItem("talklineUsers", JSON.stringify(allUsers));
  }, [user, allUsers]);

  // update local storage when post changes
  useEffect(() => {
    localStorage.setItem("talklinePosts", JSON.stringify(userPost));
  }, [userPost]);
  return (
    <main className="app">
      <BrowserRouter>
        {showModal && <TagsModal />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="/register" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/editProfile/:id"
            element={user ? <EditProfile /> : <Navigate to="/register" />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="/register" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
