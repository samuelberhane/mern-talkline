import React, { useEffect, useRef } from "react";
import "./messages.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";
import axios from "axios";
import { imageRoute, messageRoute } from "../../utils/apiRoute";

const Messages = ({ allUsers, currentChat, user, socket }) => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [currentChatInfo, setCurrentChatInfo] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(null);
  const { _id: userId } = user.user;
  const scrollMessage = useRef();

  useEffect(() => {
    scrollMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const sendMessage = async () => {
    const from = userId;
    const to = currentChat;
    socket?.current?.emit("sendMessage", {
      to: currentChat,
      sender: userId,
      text: messageText,
    });

    let { data } = await axios.post(messageRoute, {
      users: [from, to],
      sender: userId,
      text: messageText,
    });
    if (data) {
      setCurrentMessages([...currentMessages, data]);
      setMessageText("");
    }
  };

  useEffect(() => {
    socket?.current?.on("getMessage", (data) => {
      if (data.sender === currentChat && data.to === userId) {
        setReceivedMessage({
          sender: data.sender,
          users: [data.sender, data.to],
          text: data.text,
          createdAt: Date.now(),
        });
      }
    });
  }, [currentMessages, userId, socket, currentChat]);

  useEffect(() => {
    if (receivedMessage) {
      setCurrentMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const fetchAllUserMessages = async () => {
      const { data } = await axios.post(`${messageRoute}/allMessages`, {
        from: userId,
        to: currentChat,
      });
      if (data) {
        setCurrentMessages(data);
      }
    };
    fetchAllUserMessages();
  }, [currentChat, userId]);

  useEffect(() => {
    if (currentChat) {
      const chatInfo = allUsers?.tempUsers?.find(
        (user) => user._id === currentChat
      );
      setCurrentChatInfo(chatInfo);
    }
  }, [currentChat, allUsers]);

  if (!currentMessages) return "";

  return (
    <div className="messages">
      {currentChat ? (
        <section className="messageDetails">
          <div className="currentChatInfo">
            <img
              src={`${imageRoute}/${currentChatInfo?.profilePicture}`}
              alt="friend"
            />
            <h3>
              {currentChatInfo?.firstname} {currentChatInfo?.lastname}
            </h3>
          </div>
          <div className="messageContents ">
            {currentMessages?.map((messages, index) => {
              const { text, sender, createdAt } = messages;
              return (
                <div className="messageGap" key={index} ref={scrollMessage}>
                  <div
                    className={`${
                      sender === userId
                        ? "messageContent userText"
                        : "messageContent"
                    }`}
                  >
                    <p
                      className={`${
                        sender === userId
                          ? "messageText userText"
                          : "messageText"
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                  <p
                    className={`${
                      sender === userId ? "messageTime userText" : "messageTime"
                    }`}
                  >
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="messageSend">
            <textarea
              className="writeText"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write Message..."
            ></textarea>
            <button className="sendMessage" onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>
      ) : (
        <h1 className="startChat">Start Conversation</h1>
      )}
    </div>
  );
};

export default Messages;
