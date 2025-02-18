export function getTimestamp() {
  return Date.now().toString();
}

export function getDateFromTimestamp(timestamp: string) {
  const millis = Number.parseInt(timestamp);
  const date = new Date(millis).toLocaleString();
  return date;
}