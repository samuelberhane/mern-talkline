import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";
import { useNavigate } from "react-router-dom";
import { useGlobalUserContext } from "../../context/UserContext";
import axios from "axios";
import { authRoute } from "../../utils/apiRoute";

const Register = () => {
  const { dispatch } = useGlobalUserContext();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(null);
    const { firstname, lastname, email, password, confirmPassword } = userData;
    e.preventDefault();
    let { data } = await axios.post(`${authRoute}/register`, {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });
    if (data.status === true) {
      setError(null);
      navigate("/login");
      dispatch({ type: "ACCOUNT_CREATED" });
    }
    if (data.status === false) {
      setError(data.error);
    }
  };

  return (
    <div className="auth">
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
          <h1>Register</h1>

          <div className="formGroup">
            <label className="inputLabel" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userData.firstname}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
              }
            />
          </div>
          <div className="formGroup">
            <label className="inputLabel" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </div>
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
          <div className="formGroup">
            <label className="inputLabel" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
          </div>
          <button className="save" type="submit">
            Register
          </button>
          <Link to="/login">
            <button className="loginLink">Have an account? login</button>
          </Link>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
