import React, { useState } from "react";
import { updateAppointment, validate, createClassName } from "../../services";

export default function Edit({
  dictionary,
  appointment,
  edit,
  setEdit,
  updateAppointmentsList,
  mobile
}) {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [error, setError] = useState(true);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = validate(updatedAppointment, dictionary);
    if (valid === true) {
      updateAppointment(updatedAppointment).then((data) => {
        if (!data.error) {
          updateAppointmentsList(data, "edit");
          setEdit(!edit);
        } else {
          setError(data.error);
        }
      });
    } else {
      setError(valid);
      setUpdatedAppointment(appointment);
    }
  };

  const checkNull = (value) => {
    return value === null ? "" : value;
  };

  const renderButtons = () => (
    <div className="buttons">
      <button
        className={createClassName("button", "save")}
        onClick={handleSubmit}
      >
        {dictionary.save}
      </button>
      <button
        className={createClassName("button", "cancel")}
        onClick={() => setEdit(!edit)}
      >
        {dictionary.cancel}
      </button>
    </div>
  );

  return (
    <>
      <tr className="edit">
        {!mobile ? <td> {renderButtons()}</td> : null}
        <td>
          <label>{dictionary.date} </label>
          <br />
          <input
            type="date"
            name="date"
            value={updatedAppointment.date}
            onChange={handleChange}
          />
          <br />
          <label>{dictionary.time} </label>
          <br />
          <input
            type="time"
            name="time"
            value={updatedAppointment.time}
            onChange={handleChange}
          />
        </td>
        <td>
          <label>{dictionary.doctor} </label>
          <br />
          <input
            type="text"
            name="doctor"
            value={checkNull(updatedAppointment.doctor)}
            onChange={handleChange}
          />
          <br />
          <label>{dictionary.specialty} </label>
          <br />
          <input
            type="text"
            name="specialty"
            value={checkNull(updatedAppointment.specialty)}
            onChange={handleChange}
          />
        </td>
        <td>
          <label>{dictionary.patientName} </label>
          <br />
          <input
            type="text"
            name="patient"
            value={updatedAppointment.patient}
            onChange={handleChange}
          />
        </td>
        <td>
          <label>{dictionary.address} </label>
          <br />
          <input
            type="text"
            name="location"
            value={updatedAppointment.location}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            name="need_insurance"
            type="checkbox"
            checked={updatedAppointment.need_insurance}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            name="insurance_approval"
            type="checkbox"
            checked={updatedAppointment.insurance_approval}
            onChange={handleChange}
          />
        </td>
        <td>
          <label>{dictionary.additionalInformation}</label>
          <br />
          <textarea
            type="text"
            name="appointment_notes"
            value={checkNull(updatedAppointment.appointment_notes)}
            onChange={handleChange}
          />
          <br />
          <label>{checkNull(dictionary.symptoms)}</label>
          <br />
          <textarea
            type="text"
            name="symptoms"
            value={checkNull(updatedAppointment.symptoms)}
            onChange={handleChange}
          />
          {mobile ? renderButtons() : null}
        </td>
      </tr>
      {error ? (
        <tr className="table-errors">
          <td colSpan="8">{error}</td>
        </tr>
      ) : null}
    </>
  );
}
