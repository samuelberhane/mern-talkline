import React from "react";
import "./leftbar.css";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";
import { useGlobalPostContext } from "../../context/PostContext";

const Leftbar = () => {
  const { user } = useGlobalUserContext();
  const { allUsers } = useGlobalPostContext();
  return (
    <div className="leftbar">
      <div className="leftbarContainer">
        <ul className="leftbarLists">
          <li>
            <Link to={`/profile/${user.user._id}`} className="profileLink">
              <i className="fa-solid fa-id-card"></i> <p>Profile</p>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="profileLink">
              <i className="fa-solid fa-comments"></i> <p>Chats</p>
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-rss"></i> Feeds
          </li>

          <li>
            <i className="fa-solid fa-video"></i> Videos
          </li>
          <li>
            <i className="fa-solid fa-file-lines"></i>Pages
          </li>
          <li>
            <i className="fa-sharp fa-solid fa-user-group"></i> Groups
          </li>
          <li>
            <i className="fa-solid fa-bookmark"></i> Bookmarks
          </li>
          <li>
            <i className="fa-solid fa-briefcase"></i> Jobs
          </li>
          <li>
            <i className="fa-regular fa-chart-line"></i> Activities
          </li>
        </ul>
        <div className="leftbarFriends">
          <h1>All Users</h1>
          {allUsers.map((friend, index) => {
            const { profilePicture, firstname, lastname, _id } = friend;
            return (
              <div key={index}>
                <Link to={`/profile/${_id}`} className="friendsDetail">
                  <div className="friendImage">
                    <img src={`/images/${profilePicture}`} alt="profile" />
                  </div>
                  <p className="friendName">
                    {firstname} {lastname}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
