import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";
import { useGlobalUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGlobalPostContext } from "../../context/PostContext";

const Login = () => {
  const { accountCreated, dispatch } = useGlobalUserContext();
  const { dispatch: postDispatch } = useGlobalPostContext();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let json = await response.json();
    if (response.ok) {
      setError(null);
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("talklineUser", JSON.stringify(json));
      navigate("/");
    }
    if (!response.ok) {
      setError(json.error);
    }

    let postResponse = await fetch("/api/posts", { method: "GET" });
    let postJson = await postResponse.json();
    if (postResponse.ok) {
      postDispatch({ type: "GET_POSTS", payload: postJson });
      localStorage.setItem("talklinePosts", JSON.stringify(postJson));
    }
    let userResponse = await fetch("/api/users", { method: "GET" });
    let userJson = await userResponse.json();
    if (userResponse.ok) {
      postDispatch({ type: "GET_USERS", payload: userJson });
      localStorage.setItem("talklineUsers", JSON.stringify(userJson));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "REMOVE_ALERT" });
    }, 5000);
  }, [dispatch]);

  return (
    <div className="auth">
      {accountCreated && <p className="successAlert ">{accountCreated}</p>}
      <div className="authContainer">
        <div className="authContent">
          <h1>Talkline</h1>
          <p>
            Staying in touch with your friends and family and know what your
            friends or family doing using Talkline.
          </p>
        </div>
        <form className="authForm" onSubmit={handleSubmit}>
          <i className="fa-solid fa-user"></i>
          <h1>Login</h1>
          <div className="formGroup">
            <label className="inputLabel" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="formGroup">
            <label className="inputLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          <button className="save" type="submit">
            Login
          </button>
          <Link to="/register">
            <button className="loginLink">
              don't have an account? register
            </button>
          </Link>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
