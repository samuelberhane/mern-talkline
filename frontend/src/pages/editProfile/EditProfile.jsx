import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import { useGlobalUserContext } from "../../context/UserContext";
import { useState } from "react";
import "./editProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadRoute, userRoute } from "../../utils/apiRoute";
import { useGlobalPostContext } from "../../context/PostContext";

const EditProfile = () => {
  const { user, dispatch } = useGlobalUserContext();
  const { dispatch: postDispatch } = useGlobalPostContext();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    _id: user.user._id,
    firstname: user.user.firstname,
    lastname: user.user.lastname,
    currentCity: user.user.currentCity,
    homeTown: user.user.homeTown,
    relationship: user.user.relationship,
    profilePicture: "",
    coverPicture: "",
    desc: user.user.desc,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload profile picture
    let profilePictureName;
    if (userData.profilePicture) {
      const data = new FormData();
      profilePictureName = Date.now() + userData.profilePicture.name;
      data.append("name", profilePictureName);
      data.append("file", userData.profilePicture);
      await axios.post(uploadRoute, data);
    }

    // upload cover picture
    let coverPictureName;
    if (userData.coverPicture) {
      const data = new FormData();
      coverPictureName = Date.now() + userData.coverPicture.name;
      data.append("name", coverPictureName);
      data.append("file", userData.coverPicture);
      await axios.post(uploadRoute, data);
    }

    // update user profile
    let { data } = await axios.put(`${userRoute}/${user.user._id}`, {
      firstname: userData.firstname,
      lastname: userData.lastname,
      currentCity: userData.currentCity,
      homeTown: userData.homeTown,
      relationship: userData.relationship,
      desc: userData.desc,
      profilePicture: userData.profilePicture
        ? profilePictureName
        : user.user.profilePicture,
      coverPicture: userData.coverPicture
        ? coverPictureName
        : user.user.coverPicture,
    });

    if (data) {
      dispatch({ type: "UPDATE_USER", payload: data });
      postDispatch({ type: "UPDATE_USERS", payload: data });
      navigate("/");
    }
  };

  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileContainer">
        <Leftbar />
        <form className="editProfileForm" onSubmit={handleSubmit}>
          <div className="editProfileFormContainer">
            <h1>Edit Profile</h1>
            <div className="editFormGroup">
              <label htmlFor="firstname">First Name: </label>
              <input
                type="text"
                id="firstname"
                value={userData.firstname}
                onChange={(e) =>
                  setUserData({ ...userData, firstname: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="lastname">Last Name: </label>
              <input
                type="text"
                id="lastname"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="aboutme">About Me: </label>
              <input
                type="text"
                id="aboutme"
                value={userData.desc}
                onChange={(e) =>
                  setUserData({ ...userData, desc: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="homeTown">Home Town: </label>
              <input
                type="text"
                id="homeTown"
                value={userData.homeTown}
                onChange={(e) =>
                  setUserData({ ...userData, homeTown: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="currentCity">Current City: </label>
              <input
                type="text"
                id="currentCity"
                value={userData.currentCity}
                onChange={(e) =>
                  setUserData({ ...userData, currentCity: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="relationship">Relationship: </label>
              <input
                type="text"
                id="relationship"
                value={userData.relationship}
                onChange={(e) =>
                  setUserData({ ...userData, relationship: e.target.value })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="profilePicture">Profile Picture: </label>
              <input
                type="file"
                id="profilePicture"
                className="fileEdit"
                accept=".png,.jpeg,.jpg"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profilePicture: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="editFormGroup">
              <label htmlFor="coverPicture">Cover Picture: </label>
              <input
                type="file"
                id="coverPicture"
                className="fileEdit"
                accept=".png,.jpeg,.jpg"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    coverPicture: e.target.files[0],
                  })
                }
              />
            </div>
            <button type="submit" className="save">
              Update
            </button>
          </div>
        </form>
        <Rightbar />
      </div>
    </div>
  );
};

export default EditProfile;
