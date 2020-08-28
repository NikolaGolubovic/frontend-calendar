import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Calendar from "./components/Calendar";

import eventsService from "./services/eventsService";

function App() {
  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (data) {
      setUser(data.username);
      eventsService.setToken(data.token);
    }
  }, [user]);

  useEffect(() => {
    eventsService
      .getEvents()
      .then((res) => setEvents(events.concat(res.events)));
  }, []);

  return (
    <div>
      <div className="container">
        <Header user={user} setUser={setUser} setEvents={setEvents} />
        <Calendar user={user} events={events} setEvents={setEvents} />
      </div>
    </div>
  );
}

export default App;
