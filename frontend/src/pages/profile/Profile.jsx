import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import ProfileContents from "../../components/profileContents/ProfileContents";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <Navbar />
      <div className="profileContainer">
        <Leftbar />
        <ProfileContents />
      </div>
    </div>
  );
};

export default Profile;
