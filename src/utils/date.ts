import { logger } from "@/utils/logger";

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

export const getStartDateFromRange = (range?: string) => {
  const now = new Date();

  switch (range) {
    case "last-month":
      return new Date(now.getFullYear(), now.getMonth() - 1, 1);

    case "last-3-months":
      return new Date(now.getFullYear(), now.getMonth() - 2, 1);

    case "last-6-months":
      return new Date(now.getFullYear(), now.getMonth() - 5, 1);

    case "last-year":
      return new Date(now.getFullYear() - 1, now.getMonth(), 1);

    default:
      return new Date(now.getFullYear(), now.getMonth(), 1);
  }
};

export const getUpcomingRentalStartDate = (range?: string) => {
  const now = new Date();

  switch (range) {
    case "next-7-days":
    case "next-14-days":
    case "next-30-days":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());

    default:
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
};

export const getUpcomingRentalEndDate = (range?: string) => {
  const now = new Date();

  switch (range) {
    case "next-7-days":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

    case "next-14-days":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);

    case "next-30-days":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);

    default:
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
  }
};

export const formatDateTime = (
  dateValue: string | number[] | null | undefined
): string => {
  if (!dateValue) return "-";

  try {
    let date: Date;
    if (Array.isArray(dateValue)) {
      const [year, month, day, hour = 0, minute = 0, second = 0] = dateValue;
      date = new Date(year, month - 1, day, hour, minute, second);
    } else {
      date = new Date(dateValue);
    }

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch (error) {
    logger.error("Error formatting date time", error);
    return "-";
  }
};

export const parseDate = (
  dateValue: string | number[] | null | undefined
): Date | null => {
  if (!dateValue) return null;

  try {
    let date: Date;

    if (Array.isArray(dateValue)) {
      const [year, month, day, hour = 0, minute = 0, second = 0] = dateValue;
      date = new Date(year, month - 1, day, hour, minute, second);
    } else {
      date = new Date(dateValue);
    }

    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    logger.error("Error parsing date", error);
    return null;
  }
};
