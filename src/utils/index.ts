const today: Date = new Date();
const currentYear: string = String(today.getFullYear());
const currentMonth: string = String(today.getMonth());

const MonthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function formatDate(date: string | Date) {
  const _date = new Date(date);
  return _date.toLocaleDateString();
}

export { formatDate, MonthLabels, currentMonth, currentYear };
