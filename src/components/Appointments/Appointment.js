import React, { useState } from "react";
import moment from "moment";
import {
  deleteSVG,
  editSVG,
  createClassName,
  deleteAppointment,
  convertTime,
  convertDate
} from "../../services";

export default function Appointment({
  dictionary,
  appointment,
  edit,
  setEdit,
  userLanguage,
  updateAppointmentsList,
  mobile
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
    id
  } = appointment;

  const checkSpecialty = (specialty) => {
    return specialty ? `(${specialty})` : null;
  };

  const checkDate = () => {
    return userLanguage === "en"
      ? moment(date).format("dddd, MMMM Do YYYY")
      : convertDate(date);
  };

  const checkTime = () => {
    return userLanguage === "en" ? convertTime(time) : time;
  };

  const [toggle, setToggle] = useState(false);

  const handelDelete = (id) => {
    deleteAppointment(id).then((data) => {
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
        {editSVG}
      </button>
      <button className="svg-button" onClick={() => setToggle(!toggle)}>
        {deleteSVG}
      </button>
    </>
  );
  const renderAdditionalInfo = (dictionary, info) => (
    <>
      <p className="title">{dictionary}</p>
      <p className="description">{info}</p>
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
              ? renderAdditionalInfo(dictionary.notes, appointment_notes)
              : null}
            <br />
            {symptoms
              ? renderAdditionalInfo(dictionary.symptoms, symptoms)
              : null}
          </>
        ) : null}
        <div className="buttons">
          {toggle ? (
            <>
              <button
                onClick={() => handelDelete(id)}
                className={createClassName("button", "delete")}
              >
                {dictionary.delete}
              </button>{" "}
              <button
                onClick={() => setToggle(!toggle)}
                className={createClassName("button", "cancel")}
              >
                {dictionary.cancel}
              </button>
            </>
          ) : null}
        </div>
      </td>
      {mobile ? <td>{toggle ? null : renderEditDeleteButtons()}</td> : null}
    </tr>
  );
}
