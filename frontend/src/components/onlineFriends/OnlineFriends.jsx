import React from "react";
import { useGlobalPostContext } from "../../context/PostContext";
import { useGlobalUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./onlineFriends.css";

const OnlineFriends = () => {
  const { allUsers } = useGlobalPostContext();
  const { user, onlineUsers } = useGlobalUserContext();
  const { _id } = user.user;
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  if (allUsers.length > 0) {
    const { following, followers } = user?.user;
    const userFriends = [...followers, ...following];

    let uniqueFriendsArray = userFriends.filter(onlyUnique);
    let onlineUsersId = onlineUsers?.filter((person) => person.userId !== _id);

    onlineUsersId = onlineUsersId?.filter((user) => {
      const friendIndex = uniqueFriendsArray.indexOf(user.userId);
      return friendIndex >= 0;
    });

    const onlineFriends = onlineUsersId?.map((friendid) => {
      let friend = allUsers?.find((user) => user._id === friendid.userId);
      return friend;
    });

    return (
      <>
        <h1>Online Friends</h1>
        {!onlineFriends ? (
          <p></p>
        ) : (
          <div className="onlineFriends">
            {onlineFriends?.map((friend, index) => {
              const { firstname, lastname, profilePicture, _id } = friend;
              return (
                <Link to={`/profile/${_id}`} key={index}>
                  <div className="onlineFriend">
                    <div className="friendImage">
                      <img src={`/images/${profilePicture}`} alt={firstname} />
                      <div className="onlineDot"></div>
                    </div>
                    <p>
                      {firstname} {lastname}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </>
    );
  } else {
    return "";
  }
};

export default OnlineFriends;
