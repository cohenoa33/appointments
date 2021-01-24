import React, { useState } from "react";
import api from "../../services/api";
import helpers from "../../services/helpers";

export default function Edit({
  dictionary,
  appointment,
  edit,
  setEdit,
  updateAppointmentsList,
}) {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUpdatedAppointment({ ...updatedAppointment, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = helpers.validate(updatedAppointment);
    if (isValid !== true) {
      alert(`${isValid}`);
      setUpdatedAppointment(appointment);
    } else {
      api.appointment.update(updatedAppointment).then((data) => {
        if (!data.error) {
          updateAppointmentsList(data, "edit");
          setEdit(!edit);
        } else {
          alert(data.error);
        }
      });
    }
  };
  const checkNull = (value) => {
    return value === null ? "" : value;
  };

  return (
    <tr>
      <td>
        {/* <label>{dictionary.date} </label> */}
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
        {/* <label>{dictionary.doctor} </label> */}
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
        {" "}
        <input
          type="text"
          name="patient"
          value={updatedAppointment.patient}
          onChange={handleChange}
        />
      </td>
      <td>
        {" "}
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
      <td className="additional-info">
        {/* <label>{dictionary.additionalInformation}</label> */}
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
        <div className="buttons">
          <button
            className={helpers.class("button", "save")}
            onClick={handleSubmit}
          >
            {dictionary.save}{" "}
          </button>
          <button
            className={helpers.class("button", "cancel")}
            onClick={() => setEdit(!edit)}
          >
            {dictionary.cancel}
          </button>
        </div>
      </td>
    </tr>
  );
}
