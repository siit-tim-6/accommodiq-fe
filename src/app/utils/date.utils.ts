export const getTimestampSeconds = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;
};
