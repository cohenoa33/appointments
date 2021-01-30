import React, { useContext, useState, useEffect } from "react";
import Appointment from "./Row";
import TableHeader from "./TableHeader";
import Filter from "./Filter";
import { LanguageContext } from "../../containers/Language";
import filterAndSort from "../../services/filterAndSort";
import helpers from "../../services/helpers";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

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

  const renderTable = (mobile) => (
    <div>
      <table className={helpers.class("table", userLanguage)}>
        <TableHeader
          sort={sort}
          sortingBy={sortingBy}
          dictionary={dictionary}
          buttonLang={userLanguage}
          mobile={mobile}
        />

        <tbody>
          {list
            ? list.map((appointment, index) => (
                <Appointment
                  appointment={appointment}
                  index={index}
                  key={appointment.id}
                  updateAppointmentsList={updateAppointmentsList}
                  mobile={mobile}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="filter">
        <Filter sortingBy={sortingBy} setFilter={setFilter} />
      </div>
      {useWindowDimensions().width > 760
        ? renderTable(false)
        : renderTable(true)}
    </div>
  );
}
