const validate = (appointment, dictionary) => {
  let lengthError = "",
    date = "",
    time = "";

  if (appointment.doctor && appointment.doctor.length <= 1)
    lengthError = lengthError + `${dictionary.doctor}, `;
  if (appointment.patient && appointment.patient.length <= 1)
    lengthError = lengthError + `${dictionary.patientName}, `;
  if (appointment.location && appointment.location.length <= 1)
    lengthError = lengthError + `${dictionary.address}, `;

  if (lengthError)
    lengthError = lengthError.slice(0, -2) + ` ${dictionary.minTwoChar}`;

  if (!appointment.date || !validateDate(appointment.date))
    date = `${dictionary.includeDate}`;
  if (!appointment.time) time = `${dictionary.includeTime}`;

  return !lengthError && !date && !time
    ? true
    : lengthError + " " + date + " " + time;
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
