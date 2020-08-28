import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import { daysInMonth, days, months } from "../utils/helper.js";

function Calendar({ events, setEvents, user }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [firstDayMonth, setFirstDayMonth] = useState(0);
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalDate, setModalDate] = useState(0);
  const [modalMonth, setModalMonth] = useState(0);
  const [modalYear, setModalYear] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [editEventText, setEditEventText] = useState("");
  const [editEventTime, setEditEventTime] = useState("");
  const [eventKey, setEventKey] = useState("");
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    makeDates(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  function makeDates(month, year) {
    const numOfDaysInMonth = daysInMonth(year, month);
    const firstDayInMonth = new Date(year, month).getDay();
    let daysArr = null;
    if (numOfDaysInMonth + firstDayInMonth > 35) {
      daysArr = Array.from({ length: 42 });
    } else {
      daysArr = Array.from({ length: 35 });
    }
    let j = 0;
    for (var i = firstDayInMonth; i < numOfDaysInMonth + firstDayInMonth; i++) {
      if (i - j > 6) {
        j = j + 7;
      }
      daysArr[i] = days[i - j];
    }
    setDaysOfCurrentMonth(daysArr);
    setFirstDayMonth(firstDayInMonth);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      return;
    }
    setCurrentMonth(currentMonth + 1);
  }

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      return;
    }
    setCurrentMonth(currentMonth - 1);
  }

  const getEditModal = (text, time, dateKey, eventId) => {
    setModalOn(true);
    setEditModal(true);
    setEditEventText(text);
    setEditEventTime(time);
    setEventKey(dateKey);
    setEventId(eventId);
  };

  return (
    <div>
      {modalOn && (
        <Modal
          events={events}
          setEvents={setEvents}
          setModalOn={setModalOn}
          modalDate={modalDate}
          modalMonth={modalMonth}
          modalYear={modalYear}
          editModal={editModal}
          editEventText={editEventText}
          editEventTime={editEventTime}
          setEditModal={setEditModal}
          eventKey={eventKey}
          eventId={eventId}
        />
      )}

      <button onClick={previousMonth}>Back</button>
      <button onClick={nextMonth}>Next</button>
      <div className="calendar-container">
        <div className="show-year">{currentYear}</div>
        <div className="show-month">{months[currentMonth]}</div>
        <div className="days-names">
          {days.map((day) => {
            return (
              <div className="day-name" key={day}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="dates">
          {daysOfCurrentMonth.length > 0 &&
            daysOfCurrentMonth.map((day, index) => {
              let dateKey =
                "" + day + (index + 1 - firstDayMonth) + currentYear;
              return (
                <div
                  className="date"
                  key={(index + 1).toString() + currentMonth + currentYear}
                  //createEvent(day, index + 1 - firstDayMonth, currentYear)
                  onClick={
                    day && user
                      ? () => {
                          setModalOn(true);
                          setModalDate(day);
                          setModalMonth(index + 1 - firstDayMonth);
                          setModalYear(currentYear);
                        }
                      : () => {
                          console.log("nece moci");
                        }
                  }
                >
                  {day && index + 1 - firstDayMonth}
                  {events.map((event) => {
                    return event["date_key"] == dateKey ? (
                      <div
                        className="events"
                        key={event["id"] + dateKey}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className="single-event">
                          <p
                            onClick={() =>
                              getEditModal(
                                event["event_text"],
                                event["event_time"],
                                dateKey,
                                event["id"]
                              )
                            }
                          >
                            {event["event_text"]} {event["event_time"]}h
                          </p>
                        </div>
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
