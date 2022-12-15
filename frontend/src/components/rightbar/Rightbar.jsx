import React from "react";
import "./rightbar.css";
import video from "../../video/video.mp4";
import OnlineFriends from "../onlineFriends/OnlineFriends";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarContainer">
        <div className="adVideo">
          <video className="video" autoPlay={true} loop={true} muted={true}>
            <source src={video} />
          </video>
        </div>
        <div className="rightbarFriends">
          <OnlineFriends />
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
