const validate = (appointment) => {
  if (appointment.doctor !== undefined && appointment.doctor.length > 1) {
    if (appointment.patient !== undefined && appointment.patient.length > 1) {
      if (
        appointment.location !== undefined &&
        appointment.location.length > 1
      ) {
        if (appointment.date !== undefined && validateDate(appointment.date)) {
          if (appointment.time !== undefined) {
            return true;
          }
          return "Time is required: please pick hour, minutes and AM-PM";
        }
        return "Date is required: please pick valid appointment date";
      }
      return "Address is required: make sure address is 2 characters minimum";
    }
    return "Patient is required: make sure patient's name is 2 characters minimum";
  }
  return "Doctor is required: make sure doctor's name is 2 characters minimum";
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
  class: createClassName,
};

export default helpers;
