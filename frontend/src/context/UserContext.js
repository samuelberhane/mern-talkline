import React, { useContext, useReducer } from "react";

const UserContext = React.createContext();
const talklineUser = JSON.parse(localStorage.getItem("talklineUser"));

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ACCOUNT_CREATED":
      return { ...state, accountCreated: "Account Created Successfully!" };
    case "REMOVE_ALERT":
      return { ...state, accountCreated: "" };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, user: payload } };
    case "ONLINE_USERS":
      return { ...state, onlineUsers: payload };
    case "SOCKET":
      return { ...state, socket: payload };
    case "UPDATE_FOLLOW":
      let tempUser = payload.find(
        (person) => person._id === state.user.user._id
      );
      return { ...state, user: { ...state.user, user: tempUser } };
    default:
      return { ...state };
  }
};

const initialState = {
  user: talklineUser || null,
  accountCreated: "",
  onlineUsers: null,
  socket: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useGlobalUserContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useGlobalUserContext };
