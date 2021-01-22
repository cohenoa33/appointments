import { LanguageContext } from "../containers/Language";
import React, { useContext, useState } from "react";
import api from "../services/api";

export default function NewAppointment({ newAppointment, setAddNew, user }) {
  const initialState = {
    doctor: "",
    date: "",
    time: "",
    specialty: "",
    patient: "",
    address: "",
    symptoms: "",
    appointment_notes: "",
    need_insurance: false,
    insurance_approval: true,
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
        newAppointment(data);
      } else {
        alert(data.error);
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{dictionary.doctor}</label>
        <input type="text" name="doctor" onChange={handleChange} required />
        <br />
        <label>{dictionary.specialty}</label>
        <input type="text" name="specialty" onChange={handleChange} />
        <br />
        <label>{dictionary.patientName}</label>
        <input type="text" name="patient" onChange={handleChange} required />
        <br />
        <label>{dictionary.date}</label>
        <input type="date" name="date" onChange={handleChange} required />

        <label>{dictionary.time}</label>
        <input type="time" name="time" onChange={handleChange} required />
        <br />
        <label>{dictionary.address}</label>
        <input type="text" name="location" onChange={handleChange} required />
        <br />
        <label>{dictionary.symptoms}</label>
        <textarea type="text" name="symptoms" onChange={handleChange} />
        <br />
        <label>{dictionary.additionalInformation}</label>
        <textarea
          type="text"
          name="appointment_notes"
          onChange={handleChange}
        />

        <label>
          {dictionary.needInsuranceApproval}
          <input
            name="need_insurance"
            type="checkbox"
            checked={need_insurance}
            onChange={handleChange}
          />
        </label>
        <label>
          {dictionary.approvedByInsurance}
          <input
            name="insurance_approval"
            type="checkbox"
            checked={insurance_approval}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="xxx" />
      </form>
    </div>
  );
}
