import React from "react";
import "./chatFriend.css";
import { imageRoute } from "../../utils/apiRoute";

const ChatFriend = ({ friend }) => {
  const { profilePicture, firstname, lastname } = friend;
  return (
    <div className="friendInformation">
      <div className="friendImage">
        <img src={`${imageRoute}/${profilePicture}`} alt={firstname} />
      </div>
      <p>
        {firstname} {lastname}
      </p>
    </div>
  );
};

export default ChatFriend;
