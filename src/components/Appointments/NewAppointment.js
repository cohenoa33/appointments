import { LanguageContext, Text } from "../../containers/Language";
import React, { useContext, useState } from "react";

import { addAppointment, createClassName, validate } from "../../services";

export default function NewAppointment({
  addNewAppointment,
  user,
  appointment,
  addNew,
  setAddNew
}) {
  const initialState = appointment
    ? appointment
    : {
        doctor: "",
        date: "",
        time: "",
        specialty: "",
        patient: "",
        address: "",
        symptoms: "",
        appointment_notes: "",
        need_insurance: true,
        insurance_approval: false
      };

  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [
    {
      doctor,
      date,
      time,
      specialty,
      patient,
      location,
      symptoms,
      appointment_notes,
      need_insurance,
      insurance_approval
    },
    setState
  ] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "need_insurance" || name === "insurance_approval") {
      setState((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let appointment = {
      doctor,
      date,
      time,
      specialty,
      patient,
      location,
      symptoms,
      appointment_notes,
      need_insurance,
      insurance_approval,
      user_id: user
    };

    let valid = validate(appointment, dictionary);

    valid === true ? fetchAppointment(appointment) : alert(valid);
  };

  const fetchAppointment = (appointment) => {
    addAppointment(appointment).then((data) => {
      if (!data.error) {
        addNewAppointment(data);
      } else {
        alert(data.error);
      }
    });
  };
  const renderInput = (name, type, required) => {
    return appointment ? (
      <input
        type={type}
        name={name}
        onChange={handleChange}
        required={required}
        value={`appointment.${name}`}
      />
    ) : (
      <input
        type={type}
        name={name}
        onChange={handleChange}
        required={required}
      />
    );
  };
  const renderTextArea = (name) => {
    return appointment ? (
      <textarea
        className="input"
        type="text"
        name={name}
        onChange={handleChange}
        value={`appointment.${name}`}
      />
    ) : (
      <textarea
        className="input"
        type="text"
        name={name}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="new-appointment-container">
      <div className={createClassName("new-appointment-form", userLanguage)}>
        <button className="x-btn" onClick={() => setAddNew(!addNew)}>
          {dictionary.cancel}
        </button>
        <br />
        <h1>
          <Text tid="newAppointment" />
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          <label>{dictionary.doctor}</label>
          {renderInput("doctor", "text", true)}
          <br />
          <label>{dictionary.specialty}</label>
          {renderInput("specialty", "text", false)}
          <br />
          <label>{dictionary.patientName}</label>
          {renderInput("patient", "text", true)}
          <br />
          <label>{dictionary.date}</label>
          {renderInput("date", "date", true)}
          <br />
          <label>{dictionary.time}</label>
          {renderInput("time", "time", true)}
          <br />
          <label>{dictionary.address}</label>
          {renderInput("location", "text", true)}
          <br />
          <br />
          <label>{dictionary.symptoms}</label>
          {renderTextArea("symptoms")}
          <br />
          <label>{dictionary.additionalInformation}</label>
          {renderTextArea("appointment_notes")}
          <div className="checkbox">
            <label>
              {" "}
              <input
                name="need_insurance"
                type="checkbox"
                checked={
                  appointment ? appointment.need_insurance : need_insurance
                }
                onChange={handleChange}
              />
              {dictionary.needInsuranceApproval}
            </label>
            <br />
            <label>
              <input
                name="insurance_approval"
                type="checkbox"
                checked={
                  appointment
                    ? appointment.insurance_approval
                    : insurance_approval
                }
                onChange={handleChange}
              />
              {dictionary.approvedByInsurance}
            </label>
          </div>
          <br />
          <br />
          <div className="submit">
            <input type="submit" value={dictionary.save} />
          </div>
        </form>
      </div>
    </div>
  );
}
