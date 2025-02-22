export function getTimestamp() {
  return Date.now().toString();
}

export function getDateFromTimestamp(timestamp: string) {
  const millis = Number.parseInt(timestamp);
  const date = new Date(millis).toLocaleString('en-US', {month: 'short', day: '2-digit', year: 'numeric'});
  return date;
}