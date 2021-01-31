import React from "react";

export default function TableHeader({
  dictionary,
  sort,
  sortingBy,
  buttonLang,
  mobile,
}) {
  const setClassName = () =>
    buttonLang === "he" ? "hidden-button-he" : "hidden-button-en";
  const setClassNameNoSorting = () =>
    buttonLang === "he" ? "hidden-button-he-no" : "hidden-button-en-no";

  return (
    <thead>
      <tr>
        {!mobile ? (
          <th className="first-column">
            <button className={setClassNameNoSorting()}>#</button>
          </th>
        ) : null}
        <th>
          <button className={setClassName()} onClick={() => sortingBy("date")}>
            {dictionary.date}
          </button>
        </th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("doctor")}
          >
            {dictionary.doctor}
          </button>
        </th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("patient")}
          >
            {dictionary.patientName}
          </button>
        </th>
        <th>
          <button className={setClassNameNoSorting()}>
            {dictionary.address}
          </button>
        </th>
        <th>
          <button
            className={setClassName()}
            onClick={() => sortingBy("insurance_approval")}
          >
            {dictionary.needInsuranceApproval}
          </button>
        </th>
        <th>
          <button className={setClassNameNoSorting()}>
            {dictionary.approvedByInsurance}
          </button>
        </th>
        <th>
          {" "}
          <button className={setClassNameNoSorting()}>
            {dictionary.additionalInformation}
          </button>
        </th>
      </tr>
    </thead>
  );
}
