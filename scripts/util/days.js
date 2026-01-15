export function isWeekend(date) {
  const daysOfWeek = date.format('dddd');
  return daysOfWeek === 'Saturday' || daysOfWeek === 'Sunday';
}