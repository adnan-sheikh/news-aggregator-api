/**
 *
 * @param {Date} date
 * @returns Human Readable Date in the format: October 11, 2023 at 15:30:45 PM GMT+05:30
 */
export function getHumanReadableDateString(date) {
  const humanReadableDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
  return humanReadableDate;
}
