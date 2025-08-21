import { classNames } from "../../util/classNames";
import { getDateInfo, getWeekHeaders, getWeeksByDate } from "./date";

export const Calendar = ({ date = Date.now(), locale = "ru" }) => {
  const headers = getWeekHeaders({
    locale,
  });

  const weeks = getWeeksByDate({
    date,
    startDay: 1,
    holidays: [0, 6],
  });

  const getDateClassNames = (item) =>
    classNames([
      item.isToday && "ui-datepicker-today",
      !item.isSameMonth && "ui-datepicker-other-month",
    ]);

  const info = getDateInfo({
    locale,
    date,
  });

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{info.dayName}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">
            {info.dateNumber}
          </div>
          <div className="ui-datepicker-material-month">
            {info.genitiveMonth}
          </div>
          <div className="ui-datepicker-material-year">
            {date.getFullYear()}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{info.monthName}</span>&nbsp;
          <span className="ui-datepicker-year">{info.year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id} scope="col" title="Понедельник">
                {header.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week.id}>
              {week.dates.map((item) => (
                <td className={getDateClassNames(item)}>{item.date}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
