import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { newError } from "../reducers/notificationReducer";
import {
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { lightTheme, nightTheme } from "../utils/themes";

import usersService from "../services/usersService";
import loginService from "../services/loginService";

function Header({ user, setUser, setEvents, theme, setTheme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);

  const [themeIcon, setThemeIcon] = useState(faSun);

  const dispatch = useDispatch();

  const signUpStyle = {
    display: signUpOn ? "" : "none",
  };

  const logInStyle = {
    display: loginOn ? "" : "none",
  };

  const createUser = async (e) => {
    e.preventDefault();
    const errorsArr = [];
    try {
      if (username.length < 3) {
        errorsArr.push({
          message: "Your Username is need to be at least 3 characters long",
        });
      }
      if (password.length < 5) {
        errorsArr.push({
          message: "Your password is need to be at least 5 characters long",
        });
      }
      if (password !== confirmPassword) {
        errorsArr.push({ message: "Confirm your Password correctly" });
      }
      if (errorsArr.length !== 0) {
        throw errorsArr;
      }
      const res = await usersService.register({ username, password });
      const data = JSON.stringify(res);
      window.localStorage.setItem("loggedUser", data);
      window.location.reload();
    } catch (error) {
      setSignUpOn(false);
      // setUsername("");
      // setPassword("");
      // setConfirmPassword("");
      if (Array.isArray(error)) {
        error.forEach((err) => dispatch(newError(err.message)));
        return;
      }
      console.log(error.response);
      dispatch(newError(error.response.data.message));
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService.login({
        username: usernameLogin,
        password: passwordLogin,
      });
      const data = JSON.stringify(res);
      window.localStorage.setItem("loggedUser", data);
      window.location.reload();
    } catch (err) {
      setLoginOn(false);
      dispatch(newError(err.response.data.msg));
    }
  };

  const logOut = () => {
    setEvents([]);
    window.localStorage.clear();
    setUser("");
  };

  const changeTheme = () => {
    themeIcon === faSun ? setThemeIcon(faMoon) : setThemeIcon(faSun);
    theme === lightTheme ? setTheme(nightTheme) : setTheme(lightTheme);
  };

  return (
    <nav className="nav">
      <p>
        <small>
          <FontAwesomeIcon
            className="font-awesome"
            icon={themeIcon}
            onClick={changeTheme}
          />
        </small>
      </p>
      {!user ? (
        <>
          <div className="register">
            <p
              onClick={() => {
                setSignUpOn(!signUpOn);
                setLoginOn(false);
              }}
            >
              <small>
                Sign In{" "}
                <FontAwesomeIcon className="font-awesome" icon={faUser} />
              </small>
            </p>
            <form
              className="signup-form"
              style={signUpStyle}
              onSubmit={createUser}
            >
              <label htmlFor="">
                Choose Username
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Choose Passowrd
                <input
                  type="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Confirm Passowrd
                <input
                  type="password"
                  value={confirmPassword}
                  autoComplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button>Confirm</button>
            </form>
          </div>
          <div className="login">
            <p
              onClick={() => {
                setLoginOn(!loginOn);
                setSignUpOn(false);
              }}
            >
              <small>
                Sign In{" "}
                <FontAwesomeIcon className="font-awesome" icon={faSignInAlt} />
              </small>
            </p>
            <form
              className="login-form"
              style={logInStyle}
              onSubmit={loginUser}
            >
              <label htmlFor="">
                Username:
                <input
                  type="text"
                  value={usernameLogin}
                  onChange={(e) => setUsernameLogin(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Password:
                <input
                  type="password"
                  value={passwordLogin}
                  autoComplete="on"
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </label>
              <button>Confirm</button>
            </form>
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <p>
            <small>
              {user} <FontAwesomeIcon className="font-awesome" icon={faUser} />
            </small>
          </p>
          <p onClick={logOut}>
            <small>
              Log Out{" "}
              <FontAwesomeIcon className="font-awesome" icon={faSignOutAlt} />{" "}
            </small>
          </p>
        </div>
      )}
    </nav>
  );
}

export default Header;
