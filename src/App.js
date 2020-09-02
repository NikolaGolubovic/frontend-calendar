import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Notification from "./components/Notification";

import eventsService from "./services/eventsService";
import { lightTheme, nightTheme } from "./utils/themes";

function App() {
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(nightTheme);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (data) {
      setUser(data.username);
      eventsService.setToken(data.token);
    }
  }, [user]);

  useEffect(() => {
    const fetchEvents = () => {
      eventsService
        .getEvents()
        .then((res) => setEvents(events.concat(res.events)));
    };
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const changeTheme = (theme) => {
    setTheme(theme);
    document.documentElement.style.setProperty(
      "--main-bg-color",
      theme.background
    );
    document.documentElement.style.setProperty("--main-color", theme.color);
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.secondaryColor
    );
    document.documentElement.style.setProperty(
      "--border-color",
      theme.borderColor
    );
  };

  return (
    <div>
      <div className="container">
        <Header
          user={user}
          setUser={setUser}
          setEvents={setEvents}
          theme={theme}
          setTheme={setTheme}
        />
        <Notification
          lightTheme={lightTheme}
          nightTheme={nightTheme}
          theme={theme}
        />
        <Calendar user={user} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}

export default App;
