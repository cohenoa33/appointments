import moment from "moment";

export const sortBy = (array, name, order) => {
  switch (name) {
    case "date": {
      return array.sort((a, b) =>
        order ? returnDate(a, b) : returnDate(b, a)
      );
    }
    case "doctor": {
      return array.sort((a, b) => {
        let nameA = a.doctor.toUpperCase();
        let nameB = b.doctor.toUpperCase();
        return returnValue(nameA, nameB, order);
      });
    }
    case "patient": {
      return array.sort((a, b) => {
        let nameA = a.patient.toUpperCase();
        let nameB = b.patient.toUpperCase();
        return returnValue(nameA, nameB, order);
      });
    }
    case "insurance_approval": {
      let needInsurance = array.filter((app) => app.need_insurance === true);
      let noInsurance = array.filter((app) => app.need_insurance !== true);
      return order
        ? [...needInsurance, ...noInsurance]
        : [...noInsurance, ...needInsurance];
    }
    default:
      return array;
  }
};

const returnValue = (nameA, nameB, order) => {
  return order === true ? (nameA < nameB ? -1 : 1) : nameA > nameB ? -1 : 1;
};
const returnDate = (a, b) => {
  return a.date > b.date
    ? 1
    : a.date === b.date
    ? a.time > b.time
      ? 1
      : -1
    : -1;
};
export const filterBy = (array, fieldName, search) => {
  if (array) {
    if (fieldName === "need_insurance")
      return array.filter(
        (app) => app.insurance_approval === false && app.need_insurance === true
      );
    if (fieldName === "insurance_done")
      return array.filter(
        (app) => app.insurance_approval === true && app.need_insurance === true
      );
    if (fieldName === "past_only")
      return array.filter((app) => {
        return moment(app.date, "YYYY/MM/DD").isBefore(moment()) ? app : null;
      });
    if (fieldName === "future")
      return array.filter((app) => {
        return !moment(app.date, "YYYY/MM/DD").isBefore(moment()) ? app : null;
      });

    if (fieldName === "search") {
      return array.filter((app) => search(app, search));
    }
  }
  return array;
};

const search = (appointment, search) => {
  let keys = [
    "doctor",
    "patient",
    "appointment_notes",
    "location",
    "specialty",
    "symptoms"
  ];
  for (let key of keys) {
    if (appointment[key].toLowerCase().includes(search.toLowerCase()))
      return true;
  }
  return false;
};
