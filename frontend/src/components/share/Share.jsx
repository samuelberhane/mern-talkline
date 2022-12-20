import React, { useState } from "react";
import "./share.css";
import { useGlobalUserContext } from "../../context/UserContext";
import { useGlobalPostContext } from "../../context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { uploadRoute, postRoute, imageRoute } from "../../utils/apiRoute";

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
      await axios.post(uploadRoute, data);
    }
    let { data: postsData } = await axios.post(postRoute, {
      userId: user.user._id,
      image: postData.postImage ? postImageName : "",
      desc: postData.postDesc,
      tags: checkedTags,
    });

    if (postData) {
      dispatch({ type: "CREATE_POST", payload: postsData });
      setPostData({ postDesc: "", postImage: "" });
    }
  };
  return (
    <div className="share">
      <div className="shareContainer">
        <div className="shareTop">
          <div className="shareImage">
            <Link to={`/profile/${_id}`}>
              <img src={`${imageRoute}/${profilePicture}`} alt="user" />
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
                  <i className="fa-solid fa-photo-film"></i> Image
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
