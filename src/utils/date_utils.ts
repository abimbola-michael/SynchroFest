import { format, parse } from "date-fns";

export function convertDateToString(date?: Date | null) {
  if (!date) return "";
  return format(date, "dd/MM/yyyy h:mm a"); // Example: "20/06/2025 2:40 PM"
}

export function convertStringToDate(dateString?: string | null) {
  if (!dateString) return null;
  return parse(dateString, "dd/MM/yyyy h:mm a", new Date());
}

export function formatCountdown(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
  const days = Math.floor(
    (totalSeconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60)
  );
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const result = [];
  if (years > 0) result.push(`${years}y`);
  if (days > 0) result.push(`${days}d`);
  if (hours > 0) result.push(`${hours}h`);
  if (minutes > 0) result.push(`${minutes}m`);
  if (seconds > 0 || result.length === 0) result.push(`${seconds}s`);

  return result.join(" ");
}
