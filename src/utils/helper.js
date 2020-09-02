export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
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

export const years = Array.from(
  { length: 5 },
  (_v, i) => new Date().getFullYear() + i
);

export function daysInMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}
