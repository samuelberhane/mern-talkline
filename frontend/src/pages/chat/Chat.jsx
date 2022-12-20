import React, { useState } from "react";
import "./chat.css";
import Navbar from "../../components/navbar/Navbar";
import { useGlobalUserContext } from "../../context/UserContext";
import { useGlobalPostContext } from "../../context/PostContext";
import Messages from "../../components/messages/Messages";
import ChatFriend from "../../components/chatFriend/ChatFriend";
import OnlineFriends from "../../components/onlineFriends/OnlineFriends";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const { user, socket } = useGlobalUserContext();
  const { allUsers } = useGlobalPostContext();
  const { followers, following } = user.user;

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let friendsArray = [...followers, ...following];
  let uniqueFriendsArray = friendsArray.filter(onlyUnique);
  let userFriends = uniqueFriendsArray.map((id) => {
    return allUsers?.tempUsers?.find((user) => user._id === id);
  });

  return (
    <div className="chat">
      <Navbar />
      <div className="chatContainer">
        <div className="chatContents">
          <div className="chatLeft">
            <h1>Chats</h1>
            <div className="friendsInfo">
              {userFriends.map((friend, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setCurrentChat(friend._id)}
                    className="chatFriend"
                  >
                    <ChatFriend friend={friend} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chatMiddle">
            <Messages
              currentChat={currentChat}
              user={user}
              allUsers={allUsers}
              socket={socket}
            />
          </div>
          <div className="chatRight">
            <OnlineFriends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
