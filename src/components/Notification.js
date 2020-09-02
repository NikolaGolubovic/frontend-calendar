import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Notification({ lightTheme, nightTheme, theme }) {
  const dispatch = useDispatch();
  const infos = useSelector((state) => state.infos);
  const errors = useSelector((state) => state.errors);
  useEffect(() => {
    (infos.length > 0 || errors.length > 0) &&
      setTimeout(() => dispatch({ type: "RESET" }), 2000);
  }, [infos, errors]);

  const style = {
    border: "solid",
    borderWidth: 1,
    borderColor: errors.length > 0 ? "red" : "green",
    padding: 10,
    color: theme === lightTheme ? lightTheme.color : nightTheme.color,
    padding: 10,
    width: "99%",
    margin: "0 auto",
  };
  return (
    <>
      <div style={{ ...style, display: infos.length > 0 ? "" : "none" }}>
        {infos.length > 0 && infos.map((info) => info)}
      </div>
      <div style={{ ...style, display: errors.length > 0 ? "" : "none" }}>
        {errors.length > 0 && errors.map((error) => error)}
      </div>
    </>
  );
}

export default Notification;
