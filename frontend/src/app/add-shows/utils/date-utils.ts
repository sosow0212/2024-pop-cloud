export const toISOWithTime = (date: Date): string => {
  const withTime = new Date(date);
  withTime.setHours(17, 7, 41, 789);
  return withTime.toISOString();
};

export const parseISODate = (isoString: string): Date | undefined => {
  if (!isoString) return undefined;
  const date = new Date(isoString);
  return Number.isNaN(date.getTime()) ? undefined : date;
};
