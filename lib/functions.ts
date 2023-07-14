export function calculateDays(startDate: Date, endDate: Date): number {
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
}

export function dayOrDays(duration: number | string): string {
  let duration2 = duration;
  if (typeof duration2 === 'string') {
    duration2 = Number(duration2);
  }
  return duration2 + ' day' + (duration2 === 1 ? '' : 's');
}