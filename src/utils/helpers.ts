export const populateHitSlop = (val: number = 0) => ({
  top: val,
  left: val,
  right: val,
  bottom: val,
});

export function formatNumber(num: number = 0) {
  if (num >= 1_000_000) {
    // If the number is 1 million or more
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    // If the number is 1 thousand or more
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else if (num >= 1_000_000_000) {
    // If the number is 1 thousand or more
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else {
    // For numbers less than 1 thousand
    return num?.toString();
  }
}

export function removeUUID(filename: string) {
  return filename.replace(
    /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-/,
    '',
  );
}

export function subtractYears(date: Date, years: number) {
  // 👇 make copy with "Date" constructor
  const dateCopy = new Date(date);
  dateCopy.setFullYear(date.getFullYear() - years);
  return dateCopy;
}

export const formatNumberWithCommas = (text: string) => {
  // Remove all non-numeric characters except the decimal point
  text = text.replace(/[^0-9.]/g, '');

  // Split the number into the integer and decimal parts
  const parts = text.split('.');

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts
  return parts.join('.');
};

export const queryToObject = (queryString: string) => {
  // Remove the leading '?' if it exists
  const query = queryString?.startsWith('?')
    ? queryString?.slice(1)
    : queryString;

  // Split into key-value pairs
  return query?.split('&')?.reduce((acc, pair) => {
    const [key, value] = pair?.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value || ''); // Handle empty values
    return acc;
  }, {});
};

export function formatTitleUrl(str: string) {
  const firstPart = str?.split('//')[1];
  const formattedUrl = getStringBeforeSubstring(firstPart, '/');
  return formattedUrl;
}

function getStringBeforeSubstring(parentString: string, substring: string) {
  return parentString?.substring(0, parentString?.indexOf(substring));
}
