const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const fullMonths = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertDate = (milliSeconds) => {
  if (isNaN(+milliSeconds)) {
    return "unknown date";
  }
  const inputDate = new Date(+milliSeconds);
  const todayDate = new Date();
  const isToday = inputDate.getDay() === todayDate.getDay();
  const isYesterday = inputDate.getDay() === todayDate.getDay() - 1;
  let time = "";

  let hourIndicator = "AM";
  let hours = inputDate.getHours();
  let minutes = inputDate.getMinutes();
  let date = inputDate.getDate();
  let day = months[inputDate.getDay()];

  if (hours > 12) {
    hours = hours - 12; // formatting in 12 hours format
  }
  if (hours >= 12) {
    hourIndicator = "PM"; // formating in AM , PM
  }
  if (isToday) {
    time = `Today at ${hours}:${minutes} ${hourIndicator}`;
  } else if (isYesterday) {
    time = `Yeaterday at ${hours}:${minutes} ${hourIndicator}`;
  } else {
    time = `${date} ${day} at ${hours}:${minutes} ${hourIndicator}`;
  }
  return time;
};

export const getFormattedDate = (seconds) => {
  const time = new Date(seconds);
  const date = time.getDate();
  const month = fullMonths[time.getMonth()];
  const year = time.getFullYear();
  return `${date} ${month} ${year}`;
};
