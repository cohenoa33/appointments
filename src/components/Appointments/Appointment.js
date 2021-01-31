import React, { useState } from "react";
import moment from "moment";
import convertors from "../../services/convertors";
import api from "../../services/api";
import helpers from "../../services/helpers";
import svg from "../../services/svg";

export default function Appointment({
  dictionary,
  appointment,
  edit,
  setEdit,
  userLanguage,
  updateAppointmentsList,
  mobile,
}) {
  const {
    doctor,
    specialty,
    patient,
    location,
    need_insurance,
    insurance_approval,
    appointment_notes,
    date,
    time,
    symptoms,
    id,
  } = appointment;

  const checkSpecialty = (specialty) => {
    return specialty ? `(${specialty})` : null;
  };

  const checkDate = () => {
    return userLanguage === "en"
      ? moment(date).format("dddd, MMMM Do YYYY")
      : convertors.convertDate(date);
  };

  const checkTime = () => {
    return userLanguage === "en" ? convertors.convertTime(time) : time;
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
  const renderEditDeleteButtons = () => (
    <>
      <button className="svg-button" onClick={() => setEdit(!edit)}>
        {svg.edit}
      </button>
      <button className="svg-button" onClick={() => setToggle(!toggle)}>
        {svg.deleteIcon}
      </button>
    </>
  );

  return (
    <tr>
      {!mobile ? (
        <td className="first-column">
          <div className="vertical-buttons">
            {toggle ? null : renderEditDeleteButtons()}
          </div>
        </td>
      ) : null}
      <td>
        {checkDate()} {dictionary.at} {checkTime()}
      </td>
      <td>
        {doctor}
        <br /> {checkSpecialty(specialty)}
      </td>
      <td>{patient}</td>
      <td>{location !== null ? location : `${dictionary.no}`}</td>
      <td>{need_insurance ? `${dictionary.yes}` : `${dictionary.no}`}</td>
      <td>{insurance_approval ? `${dictionary.yes}` : `${dictionary.no}`}</td>
      <td className="additional-info">
        {appointment_notes || symptoms ? (
          <>
            {appointment_notes
              ? `${dictionary.notes}: ${appointment_notes}`
              : null}
            <br />
            {symptoms ? `${dictionary.symptoms}: ${symptoms}` : null}
          </>
        ) : null}
        <div className="buttons">
          {toggle ? (
            <>
              <h1 className="confirm-delete">{dictionary.confirmDelete}</h1>
              <button
                onClick={() => deleteAppointment(id)}
                className={helpers.class("button", "delete")}
              >
                {dictionary.yes}
              </button>{" "}
              <button
                onClick={() => setToggle(!toggle)}
                className={helpers.class("button", "cancel")}
              >
                {" "}
                {dictionary.cancel}
              </button>
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
