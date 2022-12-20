import React from "react";
import "./feeds.css";
import Share from "../share/Share";
import CreatedPosts from "../createdPosts/CreatedPosts";
import { useGlobalPostContext } from "../../context/PostContext";

const Feeds = () => {
  const { userPost } = useGlobalPostContext();
  const profilePerson = userPost.allPosts;
  return (
    <div className="feeds">
      <div className="feedsContainer">
        <Share />
        <CreatedPosts profilePerson={profilePerson} />
      </div>
    </div>
  );
};

export default Feeds;
