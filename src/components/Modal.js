import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import eventsService from "../services/eventsService";

function Modal({
  setModalOn,
  setEvents,
  events,
  modalDay,
  modalDate,
  modalMonth,
  modalYear,
  editModal,
  setEditModal,
  editEventText,
  editEventTime,
  eventKey,
  eventId,
}) {
  const [eventMsg, setEventMsg] = useState("");
  const [eventTime, setEventTime] = useState(0);
  const [editMsg, setEditMsg] = useState(editEventText);
  const [editTime, setEditTime] = useState(editEventTime);

  const dispatch = useDispatch();

  async function createEvent(day, date, currentMonth, currentYear) {
    const obj = {};
    const dateKey = "" + day + date + currentMonth + currentYear;
    console.log("createEvent dateKey", dateKey);
    obj[dateKey] = eventMsg;
    obj["time"] = eventTime;
    const response = await eventsService.create({
      eventMsg,
      eventTime,
      dateKey,
    });
    setEvents(events.concat(response.event));
  }

  const editEvent = async (content, id) => {
    setModalOn(false);
    setEditModal(false);
    const response = await eventsService.edit(
      { event_msg: editMsg, event_time: editTime },
      eventKey
    );
    const { date_key, event_text, event_time, event_id } = response.event;
    setEvents(
      events.map((event) =>
        event["date_key"] === date_key
          ? { event_text, event_time, id: event_id, date_key }
          : event
      )
    );
  };

  const deleteEvent = async () => {
    try {
      await eventsService.remove(eventId);
      setModalOn(false);
      setEditModal(false);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal-container">
      {!editModal ? (
        <form
          className="modal-controller"
          onSubmit={(e) => {
            e.preventDefault();
            createEvent(modalDay, modalDate, modalMonth, modalYear);
            setModalOn(false);
          }}
        >
          <button className="modal-close" onClick={() => setModalOn(false)}>
            <FontAwesomeIcon icon={faWindowClose} />
          </button>
          <label htmlFor="">
            <h3>Name your Event:</h3>
            <input type="text" onChange={(e) => setEventMsg(e.target.value)} />
          </label>
          <label htmlFor="">
            <h3>Time When The Event Starts</h3>
            <input type="text" onChange={(e) => setEventTime(e.target.value)} />
          </label>
          <button className="btn-create">Create</button>
        </form>
      ) : (
        <div className="modal-edit-container">
          <button onClick={deleteEvent} className="delete-event-button">
            Delete
          </button>
          <form onSubmit={editEvent} className="modal-edit-form">
            <button
              className="modal-edit-close-button"
              onClick={() => {
                setModalOn(false);
                setEditModal(false);
              }}
            >
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <label htmlFor="">
              <h3>Edit your Event:</h3>
              <input
                type="text"
                value={editMsg}
                onChange={(e) => setEditMsg(e.target.value)}
              />
            </label>
            <label htmlFor="">
              <h3>Edit Time of Event</h3>
              <input
                type="text"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </label>
            <button className="confirm-edit">Finish Editing</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Modal;
