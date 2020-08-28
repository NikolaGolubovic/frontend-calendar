import React, { useState } from "react";

import usersService from "../services/usersService";
import loginService from "../services/loginService";

function Header({ user, setUser, setEvents }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [signUpOn, setSignUpOn] = useState(false);
  const [loginOn, setLoginOn] = useState(false);

  const signUpStyle = {
    display: signUpOn ? "" : "none",
  };

  const logInStyle = {
    display: loginOn ? "" : "none",
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await usersService.register({ username, password });
      const data = JSON.stringify(res);
      window.localStorage.setItem("loggedUser", data);
      window.location.reload();
    } catch (err) {
      console.log("error", err);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService.login({
        username: usernameLogin,
        password: passwordLogin,
      });
      console.log(res);
      const data = JSON.stringify(res);
      window.localStorage.setItem("loggedUser", data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    setEvents([]);
    window.localStorage.clear();
    setUser("");
  };

  return (
    <nav className="nav">
      {!user ? (
        <>
          <div className="register">
            <p
              onClick={() => {
                setSignUpOn(!signUpOn);
                setLoginOn(false);
              }}
            >
              Sign Up
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label htmlFor="">
                Confirm Passowrd
                <input
                  type="password"
                  value={confirmPassword}
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
              Sign In
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
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </label>
              <button>Confirm</button>
            </form>
          </div>
        </>
      ) : (
        <div style={{ display: "flex" }}>
          <h3>{user}</h3>
          <h3 onClick={logOut}>Log Out</h3>
        </div>
      )}
    </nav>
  );
}

export default Header;
