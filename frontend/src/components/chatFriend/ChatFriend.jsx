import React from "react";
import "./chatFriend.css";

const ChatFriend = ({ ids, userId, allUsers }) => {
  const chatFriendId = ids.members.find((personid) => personid !== userId);
  const chatFriend = allUsers.find((person) => person._id === chatFriendId);

  const { profilePicture, firstname, lastname } = chatFriend;
  return (
    <div className="friendInformation">
      <div className="friendImage">
        <img src={`/images/${profilePicture}`} alt={firstname} />
      </div>
      <p>
        {firstname} {lastname}
      </p>
    </div>
  );
};

export default ChatFriend;
