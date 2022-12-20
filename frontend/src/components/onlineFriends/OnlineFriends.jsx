import React from "react";
import { useGlobalPostContext } from "../../context/PostContext";
import { useGlobalUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { imageRoute } from "../../utils/apiRoute";
import "./onlineFriends.css";

const OnlineFriends = () => {
  const { allUsers } = useGlobalPostContext();
  const { user, onlineUsers } = useGlobalUserContext();
  const { following, followers, _id } = user?.user;

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // all user friend
  const userFriends = [...followers, ...following];

  // remove repeated id
  let uniqueFriendsArray = userFriends.filter(onlyUnique);

  // filter user id from online users id
  let onlineUsersId = onlineUsers?.filter((person) => person.userId !== _id);

  // check online user is user's friend
  onlineUsersId = onlineUsersId?.filter((user) => {
    const friendIndex = uniqueFriendsArray.indexOf(user.userId);
    return friendIndex >= 0;
  });

  // get online users information
  const onlineFriends = onlineUsersId?.map((friendid) => {
    let friend = allUsers?.tempUsers?.find(
      (user) => user._id === friendid.userId
    );
    return friend;
  });
  if (allUsers?.tempUsers?.length > 0 && onlineFriends?.length > 0) {
    return (
      <>
        <h1>Online Friends</h1>
        <div className="onlineFriends">
          {onlineFriends?.map((friend, index) => {
            const { firstname, lastname, profilePicture, _id } = friend;
            return (
              <Link to={`/profile/${_id}`} key={index}>
                <div className="onlineFriend">
                  <div className="friendImage">
                    <img
                      src={`${imageRoute}/${profilePicture}`}
                      alt={firstname}
                    />
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
      </>
    );
  } else {
    return <h1>Online Friends</h1>;
  }
};

export default OnlineFriends;
