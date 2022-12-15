import React, { useEffect, useRef } from "react";
import "./messages.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState } from "react";

const Messages = ({
  allUsers,
  currentChat,
  currentMessages,
  user,
  setCurrentMessages,
  socket,
}) => {
  const [messageText, setMessageText] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const userId = user.user._id;
  const { profilePicture } = user.user;
  const chatFriendId = currentChat?.members.find((id) => id !== userId);
  const chatFriend = allUsers.find((friend) => friend._id === chatFriendId);
  const scrollMessage = useRef();

  useEffect(() => {
    scrollMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const sendMessage = async () => {
    const receiverId = currentChat?.members.find((user) => user !== userId);
    socket?.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: messageText,
    });

    socket?.on("getMessage", (data) => {
      const { senderId, text } = data;
      setReceivedMessage({
        senderId,
        text,
        createdAt: Date.now(),
      });
    });

    receivedMessage &&
      currentChat?.members.includes(receivedMessage.senderId) &&
      console.log(receivedMessage);

    let response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: currentChat._id,
        sender: userId,
        text: messageText,
      }),
    });
    let json = await response.json();
    if (response.ok) {
      setMessageText("");
      setCurrentMessages([...currentMessages, json]);
    }
  };

  // useEffect(() => {
  //   console.log(receivedMessage);
  //   receivedMessage &&
  //     currentChat?.members.includes(receivedMessage.senderId) &&
  //     console.log(receivedMessage);
  //   // setCurrentMessages([...currentMessages, receivedMessage]);
  // }, [receivedMessage]);

  if (!currentMessages) return "";

  return (
    <div className="messages">
      <div className="messagesContainer">
        <div className="messageHistory">
          {currentChat ? (
            currentMessages.map((messages, index) => {
              const { text, sender, createdAt } = messages;
              return (
                <div
                  className="messageContents "
                  key={index}
                  ref={scrollMessage}
                >
                  <div
                    className={`${
                      sender === userId
                        ? "messageContent userText"
                        : "messageContent"
                    }`}
                  >
                    <div className="messageImage">
                      <img
                        src={
                          sender === userId
                            ? `/images/${profilePicture}`
                            : `/images/${chatFriend.profilePicture}`
                        }
                        alt="user"
                      />
                    </div>
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
            })
          ) : (
            <h1 className="startChat">Start Conversation</h1>
          )}
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
      </div>
    </div>
  );
};

export default Messages;
