import React, { useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";
import decode from "jwt-decode";
import { useGlobalPostContext } from "../../context/PostContext";
import { imageRoute } from "../../utils/apiRoute";

const Navbar = () => {
  const { dispatch, user, socket } = useGlobalUserContext();
  const { dispatch: postDispatch } = useGlobalPostContext();
  const { token } = user;
  const { firstname, lastname, profilePicture, _id } = user.user;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    postDispatch({ type: "LOGOUT" });
    socket?.current?.emit("userLogout", _id);
  };

  useEffect(() => {
    if (token) {
      let decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <div className="navLeft">
          <Link to="/">
            <h1 className="navLogo">TalkLine</h1>
          </Link>
        </div>
        {/* <div className="navCenter">
          <input
            type="text"
            className="searchInput"
            placeholder="Search for person or post..."
          />
          <button className="searchIcon">
            <i className="fa-brands fa-searchengin"></i>
          </button>
        </div> */}
        <div className="navRight">
          <p className="userFullname">
            {firstname} {lastname}
          </p>
          <div className="userImage">
            <Link to={`/profile/${_id}`}>
              <img src={`${imageRoute}/${profilePicture}`} alt="user" />
            </Link>
          </div>
          {/* <div className="links">
            <div className="user link">
              <i className="fa-sharp fa-solid fa-user"></i>
              <sup className="navSup">1</sup>
            </div>
            <div className="chat link">
              <i className="fa-solid fa-message"></i>
              <sup className="navSup">3</sup>
            </div>
            <div className="notification link">
              <i className="fa-sharp fa-solid fa-bell"></i>
              <sup className="navSup">5</sup>
            </div>
          </div> */}
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
