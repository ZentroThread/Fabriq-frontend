export const today = new Date();
export const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
export const currentYear = String(today.getFullYear());
export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const getMonthDateRange = (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const format = (date: Date) => date.toLocaleDateString("en-CA");

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
};

export const getMonthAsString = (month: number): string => {
  const monthNames = [
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

  return monthNames[month - 1] || "";
};

export const getYearsForRange = () => {
  const range = 5;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < range; i++) {
    years.push(currentYear - i);
  }
  return years;
};
