export const getTimestampMiliseconds = (date: Date): number => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};
