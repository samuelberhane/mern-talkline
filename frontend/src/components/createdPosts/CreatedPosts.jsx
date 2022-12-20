import React from "react";
import { useParams } from "react-router-dom";
import CreatedPost from "../createdPost/CreatedPost";
import { useGlobalPostContext } from "../../context/PostContext";

const CreatedPosts = ({ profilePerson }) => {
  const { userPost } = useGlobalPostContext();
  const { id } = useParams();
  let singleUserPosts;
  if (userPost.allPosts) {
    singleUserPosts = userPost.allPosts.map((post) => {
      if (post.userId === id) return post;
      return "";
    });
  }

  if (!profilePerson) profilePerson = singleUserPosts;
  return (
    <div className="posts">
      <div className="postsContainer">
        {profilePerson?.map((post, index) => {
          return <CreatedPost key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default CreatedPosts;
