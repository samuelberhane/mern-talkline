import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
const talklineUsers = JSON.parse(localStorage.getItem("talklineUsers"));
const talklinePosts = JSON.parse(localStorage.getItem("talklinePosts"));

const PostContext = React.createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_POSTS":
      return { ...state, userPost: payload };
    case "GET_USERS":
      return { ...state, allUsers: payload };
    case "LOGOUT":
      return { ...state, userPost: [], allUsers: [] };
    case "CREATE_POST":
      return {
        ...state,
        userPost: [payload, ...state.userPost],
        checkedTags: [],
      };
    case "ADD_TAGS":
      return { ...state, showModal: false, checkedTags: payload };
    case "OPEN_MODAL":
      return { ...state, showModal: true };
    case "UPDATE_FOLLOW":
      let tempAllUsers = state.allUsers.map((user) => {
        let tempUser = payload.find((person) => person._id === user._id);
        if (tempUser) return tempUser;
        return user;
      });
      return { ...state, allUsers: tempAllUsers };
    case "UPDATE_LIKE":
      let updateLikedPost = state.userPost.map((post) => {
        if (post._id === payload._id) return payload;
        return post;
      });
      return { ...state, userPost: updateLikedPost };
    default:
      return state;
  }
};

const initialState = {
  userPost: talklinePosts || [],
  allUsers: talklineUsers || [],
  showModal: false,
  checkedTags: [],
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

const useGlobalPostContext = () => {
  return useContext(PostContext);
};

export { PostContextProvider, useGlobalPostContext };
