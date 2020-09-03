import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function Notification({ lightTheme, nightTheme, theme }) {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state);

  const style = {
    display: "flex",
    justifyContent: "space-between",
    border: "solid",
    borderWidth: 1,
    borderColor: notifications.errors.length > 0 ? "red" : "green",
    padding: 10,
    color: theme === lightTheme ? "black" : "white",
    padding: 10,
    width: "99%",
    margin: "0 auto",
  };

  const btnStyle = {
    backgroundColor: "none",
    color: "red",
  };

  return (
    <>
      {notifications.info &&
        notifications.info.map((info) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_INFO", id: info.id }),
            3000
          );
          return (
            <div className="info-notification" key={info.id}>
              <p>{info.content}</p>
              <div
                className="btn-notification"
                onClick={() => dispatch({ type: "REMOVE_INFO", id: info.id })}
              >
                <FontAwesomeIcon icon={faWindowClose} style={btnStyle} />
              </div>
            </div>
          );
        })}
      {notifications.errors &&
        notifications.errors.map((error) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_ERROR", id: error.id }),
            3000
          );
          return (
            <div style={style} key={error.id}>
              <p>{error.content}</p>
              <div
                className="btn-notification"
                onClick={() => dispatch({ type: "REMOVE_ERROR", id: error.id })}
              >
                <FontAwesomeIcon icon={faWindowClose} style={btnStyle} />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Notification;
