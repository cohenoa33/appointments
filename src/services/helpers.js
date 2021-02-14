const validate = (appointment, dictionary) => {
  const minTwoChar = ` ${dictionary.minTwoChar}. `;
  let message = "",
    date = "",
    time = "";
  if (appointment.doctor === "") {
    message = `${dictionary.doctor}, `;
  }
  if (appointment.patient === "") {
    message = message + `${dictionary.patientName}, `;
  }
  if (appointment.location === "") {
    message = message + `${dictionary.address}, `;
  }
  if (!appointment.date || !validateDate(appointment.date)) {
    date = `${dictionary.includeDate}. `;
  }
  if (!appointment.time) {
    time = `${dictionary.includeTime}. `;
  }

  return !time && !date && !message
    ? true
    : createErrorMessage(date, time, message, minTwoChar);
};
const createErrorMessage = (date, time, message, minTwoChar) => {
  return !message
    ? (date + time).slice(0, -2) + "."
    : message.slice(0, -2) + ":" + minTwoChar + date + time;
};

const validateDate = (date) => {
  let fiveYearsYear = new Date().getFullYear() - 5;
  return +date.split("-")[0] >= fiveYearsYear ? true : false;
};

const createClassName = (name, language) => {
  return `${name}-${language}`;
};

let helpers = {
  validate: validate,
  class: createClassName
};
export default helpers;
