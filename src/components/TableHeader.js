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
          <a
            herf="#"
            className={setClassName()}
            onClick={() => sortingBy("date")}
          >
            {dictionary.date}
          </a>
        </th>
        <th>
          <a
            herf="#"
            className={setClassName()}
            onClick={() => sortingBy("doctor")}
          >
            {dictionary.doctor}
          </a>
        </th>
        <th>
          <a
            herf="#"
            className={setClassName()}
            onClick={() => sortingBy("patient")}
          >
            {dictionary.patientName}
          </a>
        </th>
        <th>{dictionary.address}</th>
        <th>
          <a
            herf="#"
            className={setClassName()}
            onClick={() => sortingBy("insurance_approval")}
          >
            {dictionary.needInsuranceApproval}
          </a>
        </th>
        <th>{dictionary.approvedByInsurance}</th>
        <th>{dictionary.additionalInformation}</th>
      </tr>
    </thead>
  );
}
