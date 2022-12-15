import React, { useEffect, useState } from "react";
import "./chat.css";
import Navbar from "../../components/navbar/Navbar";
import { useGlobalUserContext } from "../../context/UserContext";
import { useGlobalPostContext } from "../../context/PostContext";
import Messages from "../../components/messages/Messages";
import ChatFriend from "../../components/chatFriend/ChatFriend";
import OnlineFriends from "../../components/onlineFriends/OnlineFriends";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(null);
  const { user, socket } = useGlobalUserContext();
  const { allUsers } = useGlobalPostContext();
  const userId = user.user._id;

  useEffect(() => {
    const fetchUserConversations = async () => {
      let response = await fetch(`/api/conversations/${userId}`, {
        method: "GET",
      });
      let json = await response.json();
      if (response.ok) setConversations(json);
    };
    fetchUserConversations();
  }, [userId]);

  useEffect(() => {
    const fetchMessage = async () => {
      let response = await fetch(`/api/messages/${currentChat?._id}`, {
        method: "GET",
      });
      let json = await response.json();
      if (response.ok) setCurrentMessages(json);
    };
    fetchMessage();
  }, [currentChat]);

  if (!conversations) return "";
  return (
    <div className="chat">
      <Navbar />
      <div className="chatContainer">
        <div className="chatContents">
          <div className="chatLeft">
            <input type="text" placeholder="Search For Friend..." />
            <h1>Chats</h1>
            <div className="friendsInfo">
              {conversations.map((ids, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setCurrentChat(ids)}
                    className="chatFriend"
                  >
                    <ChatFriend ids={ids} userId={userId} allUsers={allUsers} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chatMiddle">
            <Messages
              userText={false}
              currentChat={currentChat}
              currentMessages={currentMessages}
              user={user}
              allUsers={allUsers}
              setCurrentMessages={setCurrentMessages}
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
