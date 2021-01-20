import React, { useContext, useState } from "react";
import Appointment from "./Appointment";
import Filter from "./Filter";
import { UserContext } from "../containers/User";
import { LanguageContext } from "../containers/Language";

import helpers from "../services/helpers";
import moment from "moment";

export default function Appointments() {
  const { user } = useContext(UserContext);
  const { dictionary } = useContext(LanguageContext);
  const [sort, setSort] = useState("date");
  const [isSort, setIsSort] = useState({ date: true });
  const [filter, setFilter] = useState("future");
  let appointments = user.appointments;

  const sortingBy = (fieldName) => {
    setSort(fieldName);
    if (isSort[`${fieldName}`] === false) {
      setIsSort({ [`${fieldName}`]: true });
    } else {
      setIsSort({ [`${fieldName}`]: false });
    }
  };
  const filterBy = (array, fieldName) => {
    if (array) {
      if (fieldName === "need_insurance")
        return array.filter(
          (app) =>
            app.insurance_approval === false && app.need_insurance === true
        );
      if (fieldName === "insurance_done")
        return array.filter(
          (app) =>
            app.insurance_approval === true && app.need_insurance === true
        );
      if (fieldName === "past_only")
        return array.filter((app) => {
          return moment(app.date, "YYYY/MM/DD").isBefore(moment()) ? app : null;
        });
      if (fieldName === "future")
        return array.filter((app) => {
          return !moment(app.date, "YYYY/MM/DD").isBefore(moment())
            ? app
            : null;
        });
    }
    return array;
  };

  appointments = appointments
    ? helpers.sortBy(filterBy(appointments, filter), sort, isSort[`${sort}`])
    : appointments;

  return (
    <div>
      <Filter sortingBy={sortingBy} setFilter={setFilter} />
      <div>
        <table>
          <thead>
            <tr>
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
              <th>{dictionary.address}</th>
              <th>
                <button
                  className={
                    sort === "insurance_approval" ? "sorting" : "hidden-button"
                  }
                  onClick={() => sortingBy("insurance_approval")}
                >
                  {dictionary.needInsuranceApproval}?
                </button>
              </th>
              <th>{dictionary.approvedByInsurance}?</th>
              <th>{dictionary.additionalInformation}</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              ? appointments.map((appointment) => (
                  <Appointment appointment={appointment} key={appointment.id} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
