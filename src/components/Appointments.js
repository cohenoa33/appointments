import React, { useContext, useState } from "react";
import Appointment from "./Appointment";
import Filter from "./Filter";
import { Text } from "../containers/Language";
import { UserContext } from "../containers/User";
import helpers from "../services/helpers";
import useWindowDimensions from "../services/useWindowDimensions";
import moment from "moment";

export default function Appointments() {
  const { user } = useContext(UserContext);
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

  console.log(filter);

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
                  Date
                </button>
              </th>
              <th>
                <button
                  className={sort === "doctor" ? "sorting" : "hidden-button"}
                  onClick={() => sortingBy("doctor")}
                >
                  Doctor
                </button>
              </th>
              <th>
                <button
                  className={sort === "patient" ? "sorting" : "hidden-button"}
                  onClick={() => sortingBy("patient")}
                >
                  Patient Name
                </button>
              </th>
              <th>Address</th>
              <th>
                <button
                  className={
                    sort === "insurance_approval" ? "sorting" : "hidden-button"
                  }
                  onClick={() => sortingBy("insurance_approval")}
                >
                  Need Insurance Approval?
                </button>
              </th>
              <th>Approved by Insurance?</th>
              <th>Additional Information</th>
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
