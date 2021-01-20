import moment from "moment";

const convertTime = (time) => {
  let hour = time.split(":")[0];
  let ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour = hour - 12;
  if (hour === "00") hour = 12;
  let minuets = time.split(":")[1];

  return hour + ":" + minuets + " " + ampm;
};

const convertDate = (date) => {
  const days = {
    Sunday: "ראשון",
    Monday: "שני",
    Tuesday: "שלישי",
    Wednesday: "רביעי",
    Thursday: "חמישי",
    Friday: "שישי",
    Saturday: "שבת",
  };

  const months = {
    January: "ינואר",
    February: "פברואר",
    March: "מרץ",
    April: "אפריל",
    May: "מאי",
    June: "יוני",
    July: "יולי",
    August: "אוגוסט",
    September: "ספטמבר",
    October: "אוקטובר",
    November: "נובמבר",
    December: "דצמבר",
  };
  let dateToConvert = moment(date).format("dddd, MMMM Do YYYY");
  let dayWeek = dateToConvert.split(",")[0];
  let month = dateToConvert.split(" ")[1];
  let year = dateToConvert.split(" ")[3];
  let day = date.split("-")[2];
  dayWeek = days[dayWeek];
  month = months[month];
  return dayWeek + ", " + day + " ב" + month + " " + year;
};

let convertors = {
  convertTime: convertTime,
  convertDate: convertDate,
};

export default convertors;
