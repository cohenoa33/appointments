import React, { useContext, useState } from "react";
import Appointment from "./Row";
import TableHeader from "./TableHeader";
import Filter from "./Filter";
import { LanguageContext } from "../../containers/Language";
import filterAndSort from "../../services/filterAndSort";
import helpers from "../../services/helpers";

export default function Appointments({ appointments, updateAppointmentsList }) {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const [sort, setSort] = useState("date");
  const [isSort, setIsSort] = useState({ date: true });
  const [filter, setFilter] = useState("future");

  const sortingBy = (fieldName) => {
    setSort(fieldName);
    if (isSort[`${fieldName}`] === false) {
      setIsSort({ [`${fieldName}`]: true });
    } else {
      setIsSort({ [`${fieldName}`]: false });
    }
  };

  let list = appointments
    ? filterAndSort.sortBy(
        filterAndSort.filterBy(appointments, filter),
        sort,
        isSort[`${sort}`]
      )
    : appointments;

  return (
    <div>
      <div className="filter">
        <Filter sortingBy={sortingBy} setFilter={setFilter} />
      </div>
      <div>
        <table className={helpers.class("table", userLanguage)}>
          <TableHeader
            sort={sort}
            sortingBy={sortingBy}
            dictionary={dictionary}
            buttonLang={userLanguage}
          />

          <tbody>
            {list
              ? list.map((appointment) => (
                  <Appointment
                    appointment={appointment}
                    key={appointment.id}
                    updateAppointmentsList={updateAppointmentsList}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
