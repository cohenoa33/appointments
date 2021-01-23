import React, { useState } from "react";
import moment from "moment";
import convertors from "../../services/convertors";
import api from "../../services/api";

export default function Appointment({
  dictionary,
  appointment,
  edit,
  setEdit,
  userLanguage,
  updateAppointmentsList,
}) {
  const specialty = (specialty) => {
    return specialty ? `(${specialty})` : null;
  };
  const symptoms = (symptoms) => {
    return symptoms ? `${dictionary.symptoms}: ${symptoms}` : null;
  };
  const notes = (notes) => {
    return notes ? `${dictionary.notes}: ${notes}` : null;
  };
  const date = () => {
    return userLanguage === "en"
      ? moment(appointment.date).format("dddd, MMMM Do YYYY")
      : convertors.convertDate(appointment.date);
  };

  const time = () => {
    return userLanguage === "en"
      ? convertors.convertTime(appointment.time)
      : appointment.time;
  };
  const [toggle, setToggle] = useState(false);

  const deleteAppointment = (id) => {
    api.appointment.delete(id).then((data) => {
      if (!data.error) {
        updateAppointmentsList(id, "delete");
      } else {
        alert(data.error);
      }
    });
  };

  return (
    <tr>
      <td>
        {date()} {dictionary.at} {time()}
      </td>
      <td>
        {appointment.doctor}
        <br /> {specialty(appointment.specialty)}
      </td>
      <td>{appointment.patient}</td>
      <td>
        {appointment.location !== null
          ? appointment.location
          : `${dictionary.no}`}
      </td>
      <td>
        {appointment.need_insurance ? `${dictionary.yes}` : `${dictionary.no}`}
      </td>
      <td>
        {appointment.insurance_approval
          ? `${dictionary.yes}`
          : `${dictionary.no}`}
      </td>
      <td className="additional-info">
        {notes(appointment.appointment_notes)}
        <br></br>

        <br></br>
        {symptoms(appointment.symptoms)}
        <div className="buttons">
          {toggle ? (
            <>
              <h1 className="confirm-delete">{dictionary.confirmDelete}</h1>
              <button onClick={() => deleteAppointment(appointment.id)}>
                {dictionary.yes}
              </button>{" "}
              <button onClick={() => setToggle(!toggle)}>
                {" "}
                {dictionary.cancel}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEdit(!edit)}>{dictionary.edit}</button>
              <button onClick={() => setToggle(!toggle)}>
                {dictionary.delete}
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
