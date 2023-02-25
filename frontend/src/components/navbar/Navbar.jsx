import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";
import decode from "jwt-decode";
import { useGlobalPostContext } from "../../context/PostContext";
import { imageRoute } from "../../utils/apiRoute";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Menubar from "../menubar/Menubar";

const Navbar = () => {
  const { dispatch, user, socket } = useGlobalUserContext();
  const { dispatch: postDispatch } = useGlobalPostContext();
  const [openMenubar, setOpenMenubar] = useState(false);
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
  }, [token]);

  return (
    <>
      <nav className="navbar">
        <div className="navbarContainer">
          <div className="navLeft">
            <Link to="/">
              <h1 className="navLogo">TalkLine</h1>
            </Link>
          </div>
          <div className="navRight">
            <p className="userFullname">
              {firstname} {lastname}
            </p>
            <div className="userImage">
              <Link to={`/profile/${_id}`}>
                <img src={`${imageRoute}/${profilePicture}`} alt="user" />
              </Link>
            </div>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <AiOutlineMenuUnfold
            className="menuIcon"
            onClick={() => setOpenMenubar((prev) => !prev)}
          />
        </div>
      </nav>
      <div
        className={`menubarController ${
          openMenubar ? "openMenubar" : "closeMenubar"
        }`}
      >
        <Menubar openMenubar={openMenubar} handleLogout={handleLogout} />
      </div>
    </>
  );
};

export default Navbar;
