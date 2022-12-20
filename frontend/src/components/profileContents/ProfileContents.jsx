import React from "react";
import "./profileContents.css";
import CreatedPosts from "../createdPosts/CreatedPosts";
import UserInformation from "../userInformation/UserInformation";
import { useGlobalUserContext } from "../../context/UserContext";
import { Link, useParams } from "react-router-dom";
import { useGlobalPostContext } from "../../context/PostContext";
import { imageRoute } from "../../utils/apiRoute";

const ProfileContents = () => {
  const { user } = useGlobalUserContext();
  const { id } = useParams();
  const { allUsers } = useGlobalPostContext();

  if (allUsers) {
    const profilePerson = allUsers?.tempUsers?.find((user) => user._id === id);
    const { coverPicture, profilePicture, desc, firstname, lastname } =
      profilePerson;
    return (
      <div className="profileContents">
        <div className="profileContentContainer">
          <div className="coverImage">
            <img src={`${imageRoute}/${coverPicture}`} alt="cover" />
          </div>

          <div className="profileDescription">
            {user.user._id === profilePerson._id && (
              <Link
                className="editProfileLink"
                to={`/editProfile/${user.user._id}`}
              >
                Edit
              </Link>
            )}
            <div className="profileDesc">
              <div className="profileImage">
                <img src={`${imageRoute}/${profilePicture}`} alt="user" />
              </div>
              <p className="username">
                {firstname} {lastname}
              </p>
              <p className="userDesc">{desc ? desc : ""}</p>
            </div>
          </div>

          <div className="profileDetails">
            <div className="profileLeft">
              <div className="profilePosts">
                <CreatedPosts className="profilePost" />
              </div>
            </div>
            <div className="profileRight">
              <UserInformation profilePerson={profilePerson} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileContents;
