import { LanguageContext } from "../containers/Language";
import React, { useContext, useState } from "react";
import api from "../services/api";

export default function NewAppointment({ setAddNew }) {
  const { dictionary } = useContext(LanguageContext);
  const [doctor, setDoctor] = useState();
  const [specialty, setSpecialty] = useState();
  const [patient, setPatient] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [address, setAddress] = useState();
  const [symptoms, setSymptoms] = useState();
  const [info, setInfo] = useState();
  const [insurance, setInsurance] = useState(true);
  const [approved, setApproved] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    switch (name) {
      case "date":
        setDate(value);
      case "doctor":
        setDoctor(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newAppointment = {
      appointment: {
        doctor: doctor,
        specialty: specialty,
        patient: patient,
        date: date,
        time: time,
        address: address,
        symptoms: symptoms,
        appointment_notes: info,
        need_insurance: insurance,
        insurance_approval: approved,
      },
    };
    console.log(newAppointment);
    // api.appointment.add(newAppointment).then((data) => {
    //   !data.error ? setAddNew() : alert(data.error);
    // });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{dictionary.doctor}</label>
        <input type="text" name="Doctor" onChange={handleChange} required />
        <br />
        <label>{dictionary.specialty}</label>
        <input type="text" name="specialty" onChange={setSpecialty} />
        <br />
        <label>{dictionary.patientName}</label>
        <input type="text" name="patient" onChange={setPatient} required />
        <br />
        <label>{dictionary.date}</label>
        <input type="date" name="date" onChange={setDate} required />

        <label>{dictionary.time}</label>
        <input type="time" name="time" onChange={setTime} required />
        <br />
        <label>{dictionary.address}</label>
        <input type="text" name="location" onChange={setAddress} required />
        <br />
        <label>{dictionary.symptoms}</label>
        <textarea type="text" name="symptoms" onChange={setSymptoms} />
        <br />
        <label>{dictionary.additionalInformation}</label>
        <textarea type="text" name="appointment_notes" onChange={setInfo} />

        <label>
          {dictionary.needInsuranceApproval}
          <input
            name="need_insurance"
            type="checkbox"
            checked={insurance}
            onChange={() => setInsurance(!insurance)}
          />
        </label>
        <label>
          {dictionary.approvedByInsurance}
          <input
            name="insurance_approval"
            type="checkbox"
            checked={approved}
            onChange={() => setApproved(!approved)}
          />
        </label>
        <input type="submit" value="xxx" />
      </form>
    </div>
  );
}
