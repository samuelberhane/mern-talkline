import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";
import { useGlobalUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGlobalPostContext } from "../../context/PostContext";
import axios from "axios";
import { authRoute, postRoute, userRoute } from "../../utils/apiRoute";

const Login = () => {
  const { accountCreated, dispatch } = useGlobalUserContext();
  const { dispatch: postDispatch } = useGlobalPostContext();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    let { data } = await axios.post(`${authRoute}/login`, { email, password });
    if (data.status === true) {
      setError(null);
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("talklineUser", JSON.stringify(data));
      navigate("/");
    }
    if (data.status === false) {
      setError(data.error);
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
            Stay in touch with your friends and family and know what your
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
