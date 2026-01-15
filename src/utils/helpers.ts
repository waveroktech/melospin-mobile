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

export const formatNumberWithCommas = (text: any) => {
  let value = text?.toString();
  // Remove all non-numeric characters except the decimal point
  if (!value) {
    return '';
  }
  value = value?.replace(/[^0-9.]/g, '');

  // Split the number into the integer and decimal parts
  const parts = value?.split('.');

  // Format the integer part with commas
  parts[0] = parts?.[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts
  return parts?.join('.');
};

export const queryToObject = (queryString: string) => {
  // Remove the leading '?' if it exists
  const query = queryString?.startsWith('?')
    ? queryString?.slice(1)
    : queryString;

  // Split into key-value pairs
  return query?.split('&')?.reduce((acc: {[key: string]: string}, pair) => {
    const [key, value] = pair?.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value || ''); // Handle empty values
    return acc;
  }, {} as {[key: string]: string});
};

export function formatTitleUrl(str: string) {
  const firstPart = str?.split('//')[1];
  const formattedUrl = getStringBeforeSubstring(firstPart, '/');
  return formattedUrl;
}

function getStringBeforeSubstring(parentString: string, substring: string) {
  return parentString?.substring(0, parentString?.indexOf(substring));
}

export const capitalizeTitle = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const calculateEndDate = (
  startDate: string,
  timeline: string,
): string => {
  if (!startDate || !timeline) {
    return '';
  }

  const moment = require('moment');
  const start = moment(startDate);
  let end = moment(startDate);

  // Map timeline to duration in days
  const timelineMap: {[key: string]: number} = {
    Today: 0,
    Yesterday: 0,
    'This Week': 7,
    'This Month': 30,
    'Last Month': 30,
    'All Time': 365,
    // Handle month-based timelines (e.g., "1 month", "2 months")
    '1 month': 30,
    '2 months': 60,
    '3 months': 90,
    '4 months': 120,
    '5 months': 150,
    '6 months': 180,
  };

  // Try to parse timeline as "X month(s)" format
  const monthMatch = timeline.match(/(\d+)\s*month/i);
  if (monthMatch) {
    const months = parseInt(monthMatch[1], 10);
    end = start.clone().add(months, 'months');
  } else {
    // Use the timeline map
    const days = timelineMap[timeline] || 30; // Default to 30 days if not found
    end = start.clone().add(days, 'days');
  }

  return end.toISOString();
};
