import { LanguageContext, Text } from "../../containers/Language";
import React, { useContext, useState } from "react";

import api from "../../services/api";

export default function NewAppointment({
  addNewAppointment,
  user,
  appointment,
  addNew,
  setAddNew,
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
        insurance_approval: false,
      };

  const { dictionary } = useContext(LanguageContext);
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
      insurance_approval,
    },
    setState,
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
      user_id: user,
    };
    api.appointment.add(appointment).then((data) => {
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
        type="text"
        name={name}
        onChange={handleChange}
        value={`appointment.${name}`}
      />
    ) : (
      <textarea type="text" name={name} onChange={handleChange} />
    );
  };

  return (
    <div>
      <button className="x-btn" onClick={() => setAddNew(!addNew)}>
        {dictionary.cancel}
      </button>
      <Text tid="newAppointment" />
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
        <label>{dictionary.time}</label>
        {renderInput("time", "time", true)}
        <br />
        <label>{dictionary.address}</label>
        {renderInput("location", "text", true)}
        <br />
        <label>{dictionary.symptoms}</label>
        {renderTextArea("symptoms")}
        <br />
        <label>{dictionary.additionalInformation}</label>
        {renderTextArea("appointment_notes")}

        <label>
          {dictionary.needInsuranceApproval}
          <input
            name="need_insurance"
            type="checkbox"
            checked={appointment ? appointment.need_insurance : need_insurance}
            onChange={handleChange}
          />
        </label>
        <label>
          {dictionary.approvedByInsurance}
          <input
            name="insurance_approval"
            type="checkbox"
            checked={
              appointment ? appointment.insurance_approval : insurance_approval
            }
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="xxx" />
      </form>
    </div>
  );
}
