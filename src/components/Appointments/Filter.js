import React, { useState, useContext } from "react";
import { LanguageContext } from "../../containers/Language";
import { createClassName } from "../../services";

export default function Filter({ setFilter }) {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [selected, setSelected] = useState("future");

  const filter = (e) => {
    setSelected(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <>
      <label className="filter-label">
        <select
          value={selected}
          onChange={filter}
          className={createClassName("select", userLanguage)}
        >
          <option value="future">{dictionary.nextAppointments}</option>
          <option value="past_only">{dictionary.archive}</option>
          <option value="need_insurance">
            {" "}
            {dictionary.needInsuranceApproval}
          </option>
          <option value="insurance_done">
            {dictionary.approvedByInsurance}
          </option>
          <option value="all">{dictionary.allAppointments}</option>
        </select>
      </label>
    </>
  );
}
