import {
  addDaysToDate,
  dayEquals,
  DAYS_IN_WEEK,
  getMonthBeginning,
  getWeekStart,
} from "../../util/date";
import { range } from "../../util/number";
import { capitalize } from "../../util/string";

export const getDateInfo = ({ date, locale }) => {
  const dateNumber = date.getDate();
  const year = date.getFullYear();

  const monthName = capitalize(
    date.toLocaleDateString(locale, { month: "long" })
  );
  const genitiveMonth = date
    .toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
    })
    .replace(/^\d+\s/, "");

  const dayName = capitalize(
    date.toLocaleDateString(locale, {
      weekday: "long",
    })
  );

  return {
    dayName,
    dateNumber,
    monthName,
    genitiveMonth,
    year,
  };
};

export const getWeekHeaders = ({ locale, weekDayStart }) => {
  const start = getWeekStart({
    date: new Date(),
    weekDayStart,
  });

  return range(0, 7).map((value) => {
    const dayIndex = value % DAYS_IN_WEEK;

    const date = addDaysToDate(start, dayIndex);

    const short = capitalize(
      date.toLocaleDateString(locale, { weekday: "short" })
    );
    const long = date.toLocaleDateString(locale, { weekday: "long" });
    return {
      id: value,
      short,
      long,
    };
  });
};

export const getWeeksByDate = ({
  date,
  weekDayStart = 1,
  holidays = [0],
  weeks = 5,
}) => {
  const firstDay = getMonthBeginning(date);

  const firstWeekStart = getWeekStart({
    date: firstDay,
    weekDayStart,
  });

  return range(0, weeks).map((index) => {
    const daysOffset = index * DAYS_IN_WEEK;
    const weekDate = addDaysToDate(firstWeekStart, daysOffset);

    return getWeekDays({
      startWeekDate: weekDate,
      holidays,
      today: date,
    });
  });
};

export const getWeekDays = ({ startWeekDate, holidays, today }) => {
  const dates = range(0, DAYS_IN_WEEK).map((dayIndex) => {
    const date = addDaysToDate(startWeekDate, dayIndex);
    const day = date.getDay();

    const isSameMonth = today.getMonth() === date.getMonth();
    const isHoliday = holidays.includes(day);

    const isToday = dayEquals(date, today);
    return {
      id: date.toString(),
      date: date.getDate(),
      day,
      isSameMonth,
      isHoliday,
      isToday,
    };
  });

  return {
    id: startWeekDate.toString(),
    dates,
  };
};
