import React, { useContext, useState } from "react";
import Appointment from "./Appointment";
import TableHeader from "./TableHeader";
import Filter from "./Filter";
import { LanguageContext } from "../containers/Language";
import filterAndSort from "../services/filterAndSort";

export default function Appointments({ appointments }) {
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
    <div className="no-margin">
      <Filter sortingBy={sortingBy} setFilter={setFilter} />
      <div className="no-margin">
        <table className={`table-${userLanguage}`}>
          <TableHeader
            sort={sort}
            sortingBy={sortingBy}
            dictionary={dictionary}
            buttonLang={userLanguage}
          />

          <tbody>
            {list
              ? list.map((appointment) => (
                  <Appointment appointment={appointment} key={appointment.id} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
