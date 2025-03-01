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
