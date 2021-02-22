export const searchBy = (appointments, search) =>
  appointments.filter((app) => checkValues(app, search));

const checkValues = (appointment, search) => {
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
