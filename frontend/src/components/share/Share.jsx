import React, { useState } from "react";
import "./share.css";
import { useGlobalUserContext } from "../../context/UserContext";
import { useGlobalPostContext } from "../../context/PostContext";
import { Link } from "react-router-dom";

const Share = () => {
  const { user } = useGlobalUserContext();
  const { dispatch, checkedTags } = useGlobalPostContext();
  const { profilePicture, firstname, lastname, _id } = user.user;
  const [postData, setPostData] = useState({ postDesc: "", postImage: "" });

  const handlePost = async () => {
    let postImageName;
    if (postData.postImage) {
      const data = new FormData();
      postImageName = new Date().getTime() + postData.postImage.name;
      data.append("name", postImageName);
      data.append("file", postData.postImage);
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
    let response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.user._id,
        image: postData.postImage ? postImageName : "",
        desc: postData.postDesc,
        tags: checkedTags,
      }),
    });

    let json = await response.json();
    if (response.ok) {
      dispatch({ type: "CREATE_POST", payload: json });
      setPostData({ postDesc: "", postImage: "" });
    }
  };
  return (
    <div className="share">
      <div className="shareContainer">
        <div className="shareTop">
          <div className="shareImage">
            <Link to={`/profile/${_id}`}>
              <img src={`/images/${profilePicture}`} alt="user" />
            </Link>
          </div>
          <textarea
            value={postData.postDesc}
            onChange={(e) =>
              setPostData({ ...postData, postDesc: e.target.value })
            }
            type="text"
            className="shareInput"
            placeholder={`What is in your mind ${firstname} ${lastname}?`}
          ></textarea>
        </div>
        <div className="shareBottom">
          <div className="shareIcons">
            <ul className="shareLists">
              <li>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setPostData({ ...postData, postImage: e.target.files[0] })
                  }
                />
                <label htmlFor="file" className="fileUpload">
                  <i className="fa-solid fa-photo-film"></i>  Image
                </label>
              </li>
              <li>
                <i className="fa-solid fa-comment"></i> Comments
              </li>
              <li>
                <i className="fa-sharp fa-solid fa-lightbulb"></i> Thoughts
              </li>
              <li onClick={() => dispatch({ type: "OPEN_MODAL" })}>
                <i className="fa fa-tags" aria-hidden="true"></i> Tags
              </li>
            </ul>
          </div>
          <button className="shareBtn" onClick={handlePost}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
