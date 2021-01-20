import React, { useContext } from "react";
import moment from "moment";
import convertors from "../services/convertors";
import { LanguageContext } from "../containers/Language";

function Appointment({ appointment }) {
  const { dictionary, userLanguage } = useContext(LanguageContext);

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
  console.log(appointment.date);
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
        {appointment.location !== null ? (
          appointment.location
        ) : (
          <p className="text-hidden">{dictionary.no}</p>
        )}
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
        <div className="buttons"></div>
      </td>
    </tr>
  );
}

export default Appointment;
