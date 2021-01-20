import React from "react";
import svg from "../services/svg";

export default function TableHeader({
  dictionary,
  sort,
  sortingBy,
  buttonLang,
}) {
  const setClassName = () =>
    buttonLang === "he" ? "hidden-button-he" : "hidden-button-en";

  return (
    <thead>
      <tr>
        <th>
          <button className={setClassName()} onClick={() => sortingBy("date")}>
            {svg.arrowDown}
            {dictionary.date}
          </button>
        </th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("doctor")}
          >
            {svg.arrowDown}
            {dictionary.doctor}
          </button>
        </th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("patient")}
          >
            {svg.arrowDown}
            {dictionary.patientName}
          </button>
        </th>
        <th>{dictionary.address}</th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("insurance_approval")}
          >
            {svg.arrowDown}
            {dictionary.needInsuranceApproval}
          </button>
        </th>
        <th>{dictionary.approvedByInsurance}</th>
        <th>{dictionary.additionalInformation}</th>
      </tr>
    </thead>
  );
}
