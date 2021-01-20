import React, { useState, useContext } from "react";
import { LanguageContext } from "../containers/Language";

export default function Filter({ setFilter }) {
  const { dictionary } = useContext(LanguageContext);
  const [selected, setSelected] = useState("future");
  const filter = (e) => {
    setSelected(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <label>
      <select value={selected} onChange={filter}>
        <option value="future">{dictionary.nextAppointments}</option>
        <option value="past_only">{dictionary.archive}</option>
        <option value="need_insurance">
          {" "}
          {dictionary.needInsuranceApproval}
        </option>
        <option value="insurance_done">{dictionary.approvedByInsurance}</option>
        <option value="all">{dictionary.allAppointments}</option>
      </select>
    </label>
  );
}
