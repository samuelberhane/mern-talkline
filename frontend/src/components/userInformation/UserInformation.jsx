import React from "react";
import "./userInformation.css";
import { useGlobalPostContext } from "../../context/PostContext";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";

const UserInformation = ({ profilePerson }) => {
  const { user, dispatch } = useGlobalUserContext();
  const { allUsers, dispatch: postDispatch } = useGlobalPostContext();
  const { currentCity, homeTown, relationship, _id, followers, following } =
    profilePerson;
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let friendsArray = [...followers, ...following];
  let uniqueFriendsArray = friendsArray.filter(onlyUnique);
  let userFriends = uniqueFriendsArray.map((id) => {
    return allUsers.find((user) => user._id === id);
  });

  const handleFollow = async () => {
    let response = await fetch(
      followers.includes(user.user._id.toString())
        ? `/api/users/unfollow/${_id}`
        : `/api/users/follow/${_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.user),
      }
    );
    let json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_FOLLOW", payload: json });
      postDispatch({ type: "UPDATE_FOLLOW", payload: json });
    }
  };
  return (
    <div className="userInformation">
      <div className="information">
        <h1>User Information</h1>
        {user.user._id !== _id && (
          <button className="follow" onClick={handleFollow}>
            {followers.includes(user.user._id.toString()) ? (
              <p>
                Unfollow <i className="fas fa-minus"></i>
              </p>
            ) : (
              <p>
                Follow <i className="fas fa-plus"></i>
              </p>
            )}
          </button>
        )}

        <p>
          Followers: <span className="infoSpan">{followers.length}</span>{" "}
        </p>
        <p>
          Following: <span className="infoSpan">{following.length}</span>{" "}
        </p>

        <p className="from">
          Home Town:{" "}
          <span className="infoSpan">{homeTown ? homeTown : ""}</span>{" "}
        </p>
        <p className="city">
          Current City:
          <span className="infoSpan"> {currentCity ? currentCity : ""}</span>
        </p>
        <p className="relation">
          Relationship:{" "}
          <span className="infoSpan">{relationship ? relationship : ""}</span>
        </p>
      </div>

      <div className="userfriends">
        <h1>User Friends</h1>
        <div className="friends">
          {userFriends.map((friend, index) => {
            const { firstname, lastname, profilePicture, _id } = friend;
            return (
              <Link to={`/profile/${_id}`} key={index}>
                <div className="userfriend">
                  <div className="userfriendImage">
                    <img src={`/images/${profilePicture}`} alt={firstname} />
                  </div>
                  {firstname} {lastname}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
