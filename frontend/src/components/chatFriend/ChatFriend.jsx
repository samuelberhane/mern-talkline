import React from "react";
import "./chatFriend.css";
import { imageRoute } from "../../utils/apiRoute";

const ChatFriend = ({ friend }) => {
  return (
    <div className="friendInformation">
      <div className="friendImage">
        <img
          src={`${imageRoute}/${friend?.profilePicture}`}
          alt={friend?.firstname}
        />
      </div>
      <p>
        {friend?.firstname} {friend?.lastname}
      </p>
    </div>
  );
};

export default ChatFriend;
