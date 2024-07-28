export function checkWeekend(date) {
  const weekday = new Date(date).getDay();
  if (weekday % 6 === 0) {
    return "Brak danych dla dni weekendowych";
  } else {
    return "Brak danych dla wskazanego dnia roboczego.";
  }
}
