import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import { newError } from "../reducers/notificationReducer";
import Modal from "./Modal";
import { daysInMonth, years, months, days } from "../utils/helper.js";

function Calendar({ events, setEvents, user }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [firstDayMonth, setFirstDayMonth] = useState(0);
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalDay, setModalDay] = useState(0);
  const [modalDate, setModalDate] = useState(0);
  const [modalMonth, setModalMonth] = useState(0);
  const [modalYear, setModalYear] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [editEventText, setEditEventText] = useState("");
  const [editEventTime, setEditEventTime] = useState("");
  const [eventKey, setEventKey] = useState("");
  const [eventId, setEventId] = useState(0);
  const [optionsMonths, setOptionMonths] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    makeDates(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const yearsMonth = [];
    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < months.length; j++) {
        yearsMonth.push(`${years[i]} ${months[j]}`);
      }
    }
    const thisMonth = new Date().getMonth();
    setOptionMonths(yearsMonth.slice(thisMonth));
  }, []);

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

  const handleOption = (e) => {
    const yearMonth = e.target.value.split(" ");
    let month = 0;
    let year = +yearMonth[0];
    for (let i = 0; i < months.length; i++) {
      if (months[i] === yearMonth[1]) {
        month = i;
      }
    }
    setCurrentYear(year);
    setCurrentMonth(month);
    makeDates(year, month);
  };

  return (
    <div>
      {modalOn && (
        <Modal
          events={events}
          setEvents={setEvents}
          setModalOn={setModalOn}
          modalDay={modalDay}
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

      {/* <select name="" id="" onChange={changeTheme}>
        <option value=""></option>
        <option value={themes.testRed}>red</option>
        <option value={themes.nightTheme}>Night</option>
      </select> */}

      <div className="calendar-container">
        <div className="controller-and-info-month">
          <div onClick={previousMonth} className="button-left">
            <FontAwesomeIcon
              className="arrow font-awesome"
              icon={faArrowAltCircleLeft}
            />{" "}
          </div>
          {months[currentMonth]} {currentYear}
          <div onClick={nextMonth} className="button-right">
            <FontAwesomeIcon
              className="arrow font-awesome"
              icon={faArrowAltCircleRight}
            />{" "}
          </div>
        </div>
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
                "" +
                day +
                (index + 1 - firstDayMonth) +
                currentMonth +
                currentYear;

              return (
                <div
                  className="date"
                  key={(index + 1).toString() + currentMonth + currentYear}
                  //createEvent(day, index + 1 - firstDayMonth, currentYear)
                  onClick={
                    day && user
                      ? () => {
                          setModalOn(true);
                          setModalDay(day);
                          setModalDate(index + 1 - firstDayMonth);
                          setModalMonth(currentMonth);
                          setModalYear(currentYear);
                        }
                      : () => {
                          if (!user) {
                            dispatch(
                              newError(
                                "Invalid action, if you want to make event firstly you need to be Login!"
                              )
                            );
                          } else {
                            dispatch(newError("Be careful where you click!"));
                          }
                        }
                  }
                >
                  <small>{day && index + 1 - firstDayMonth}</small>
                  {events.map((event) => {
                    return event["date_key"] === dateKey ? (
                      <div
                        className="events"
                        key={event["id"] + dateKey}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className="single-event">
                          <small
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
                          </small>
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
        <label className="label-choose-month">
          Chooose Month
          <select
            name=""
            id=""
            onChange={handleOption}
            className="choose-month"
          >
            {optionsMonths.map((month) => {
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
}

export default Calendar;
