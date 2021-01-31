import React from "react";

export default function TableHeader({ dictionary, sort, sortingBy, mobile }) {
  console.log(sort);
  return (
    <thead>
      <tr>
        {!mobile ? (
          <th className="first-column">
            <button className="hidden-button-no-sorting"></button>
          </th>
        ) : null}
        <th>
          <button
            className={sort === "date" ? "sorting" : "hidden-button"}
            onClick={() => sortingBy("date")}
          >
            {dictionary.date}
          </button>
        </th>
        <th>
          <button
            className={sort === "doctor" ? "sorting" : "hidden-button"}
            onClick={() => sortingBy("doctor")}
          >
            {dictionary.doctor}
          </button>
        </th>
        <th>
          <button
            className={sort === "patient" ? "sorting" : "hidden-button"}
            onClick={() => sortingBy("patient")}
          >
            {dictionary.patientName}
          </button>
        </th>
        <th>
          <button className="hidden-button-no-sorting">
            {dictionary.address}
          </button>
        </th>
        <th>
          <button
            className={
              sort === "insurance_approval" ? "sorting" : "hidden-button"
            }
            onClick={() => sortingBy("insurance_approval")}
          >
            {dictionary.needInsuranceApproval}
          </button>
        </th>
        <th>
          <button className="hidden-button-no-sorting">
            {dictionary.approvedByInsurance}
          </button>
        </th>
        <th>
          {" "}
          <button className="hidden-button-no-sorting">
            {dictionary.additionalInformation}
          </button>
        </th>
      </tr>
    </thead>
  );
}
