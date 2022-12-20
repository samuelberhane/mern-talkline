import React from "react";
import "./userInformation.css";
import { useGlobalPostContext } from "../../context/PostContext";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";
import axios from "axios";
import { imageRoute, userRoute } from "../../utils/apiRoute";

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
    return allUsers?.tempUsers?.find((user) => user._id === id);
  });

  const handleFollow = async () => {
    let { data } = await axios.put(
      followers.includes(user.user._id.toString())
        ? `${userRoute}/unfollow/${_id}`
        : `${userRoute}/follow/${_id}`,

      user.user
    );

    if (data) {
      dispatch({ type: "UPDATE_FOLLOW", payload: data });
      postDispatch({ type: "UPDATE_FOLLOW", payload: data });
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
                    <img
                      src={`${imageRoute}/${profilePicture}`}
                      alt={firstname}
                    />
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
