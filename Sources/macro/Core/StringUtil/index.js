export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function uncapitalize(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function formatBytesToProperUnit(size, precision = 2, chunkSize = 1000) {
  const units = ['TB', 'GB', 'MB', 'KB'];
  let value = Number(size);
  let currentUnit = 'B';
  while (value > chunkSize) {
    value /= chunkSize;
    currentUnit = units.pop();
  }
  return `${value.toFixed(precision)} ${currentUnit}`;
}

export function formatNumbersWithThousandSeparator(n, separator = ' ') {
  const sections = [];
  let size = n;
  while (size > 1000) {
    sections.push(`000${size % 1000}`.slice(-3));
    size = Math.floor(size / 1000);
  }
  if (size > 0) {
    sections.push(size);
  }
  sections.reverse();
  return sections.join(separator);
}

export function enumToString(e, value) {
  return Object.keys(e).find((key) => e[key] === value);
}
