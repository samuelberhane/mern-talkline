import React from "react";
import "./tagsModal.css";
import { useGlobalPostContext } from "../../context/PostContext";
import { useGlobalUserContext } from "../../context/UserContext";

const TagsModal = () => {
  const { dispatch, allUsers } = useGlobalPostContext();
  const { user } = useGlobalUserContext();
  const handleTags = () => {
    let tags = [],
      inputs = document.querySelectorAll(".checkTags");
    for (let i = inputs.length - 1; i >= 0; i--)
      if (inputs[i].type === "checkbox" && inputs[i].checked) {
        tags.push(inputs[i].value);
      }
    dispatch({ type: "ADD_TAGS", payload: tags });
  };
  return (
    <div className="tagsModal">
      <div className="tagsModalContainer">
        <h2>Tag Friends</h2>
        {allUsers
          .filter((friend) => friend._id !== user.user._id)
          .map((friend, index) => {
            const { firstname, lastname } = friend;
            return (
              <div className="tag" key={index}>
                <input
                  type="checkbox"
                  id={firstname}
                  value={`${firstname} ${lastname}`}
                  className="checkTags"
                />
                <label htmlFor={firstname}>
                  {firstname} {lastname}
                </label>
              </div>
            );
          })}
        <button className="addTag" onClick={handleTags}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TagsModal;
