import React from "react";
import { Link } from "react-router-dom";
import { useGlobalPostContext } from "../../context/PostContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useGlobalUserContext } from "../../context/UserContext";

const CreatedPost = ({ post }) => {
  const { allUsers, dispatch } = useGlobalPostContext();
  const { user } = useGlobalUserContext();
  const { image, desc, createdAt, tags, userId, likes, _id } = post;
  let postOwner = allUsers.find((user) => user._id === userId);

  if (postOwner) {
    const { firstname, lastname, profilePicture } = postOwner;

    const handleUserTags = () => {
      if (tags.length === 0) return `${firstname} ${lastname}`;
      if (tags.length === 1) return `${firstname} ${lastname} with ${tags[0]}`;
      if (tags.length === 2)
        return `${firstname} ${lastname} with ${tags[0]} and 1 other`;
      if (tags.length > 2)
        return `${firstname} ${lastname} with ${tags[0]} and ${
          tags.length - 1
        } others`;
    };
    let userTags = handleUserTags();

    const handleLike = async () => {
      let response = await fetch(`/api/posts/like/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likingUser: user.user }),
      });

      let json = await response.json();
      if (response.ok) {
        dispatch({ type: "UPDATE_LIKE", payload: json });
      }
    };

    return (
      <div className="post">
        <div className="postTop">
          <div className="postUser">
            <div className="postUserImage">
              <Link to={`/profile/${userId}`}>
                <img src={`/images/${profilePicture}`} alt="user" />
              </Link>
            </div>
            <div className="postUserTags">
              <p className="boldSpan">{userTags}</p>
            </div>
          </div>
          <button className="postEdit">
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
        </div>
        <div className="postMiddle">
          <p className="desc">{desc}</p>
          {image && (
            <div className="postImage">
              <img src={`/images/${image}`} alt="post" />
            </div>
          )}
          <p className="postTime">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="postBottom">
          <div className="postLike">
            <button className="likeIcon" onClick={handleLike}>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </button>
            {likes.length}
          </div>
        </div>
      </div>
    );
  }
};

export default CreatedPost;
