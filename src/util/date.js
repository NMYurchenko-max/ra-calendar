export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = HOUR * 24;

export const DAYS_IN_WEEK = 7;

export const getDateBeginning = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getMonthBeginning = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getWeekStart = ({ date, weekDayStart = 1 }) => {
  const day = date.getDay();

  if (day === weekDayStart) {
    return getDateBeginning(date);
  }

  const days =
    day > weekDayStart
      ? day - weekDayStart
      : DAYS_IN_WEEK - 1 - day + weekDayStart;

  const diffDate = subtractDaysFromDate(date, days);

  return getDateBeginning(diffDate);
};

export const dayEquals = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth();
export const addDaysToDate = (date, days = 1) => {
  if (days === 0) {
    return date;
  }
  const timestamp = date.getTime() + days * DAY;
  return new Date(timestamp);
};

export const subtractDaysFromDate = (date, days = 1) => {
  if (days === 0) {
    return date;
  }
  const timestamp = date.getTime() - days * DAY;
  return new Date(timestamp);
};
