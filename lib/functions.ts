export function calculateDays(startDate: Date, endDate: Date): number {
  return (
    Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) +
    1
  );
}

export function dayOrDays(duration: number | string): string {
  let duration2 = duration;
  if (typeof duration2 === 'string') {
    duration2 = Number(duration2);
  }
  return duration2 + ' day' + (duration2 === 1 ? '' : 's');
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function dateFormatter(date: Date): string {
  return dateFormat.format(date);
}

export function dateISOFormatter(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const nameMapping = new Map([
  ['Agent S', 'Agent_S'],
  ['Agent_S', 'Agent S'],
  ['Big Top', 'Big_Top'],
  ['Big_Top', 'Big Top'],
  ['Kid Cat', 'Kid_Cat'],
  ['Kid_Cat', 'Kid Cat'],
  ["O'Hare", 'O_Hare'],
  ['O_Hare', "O'Hare"],
  ['Renée', 'Renee'],
  ['Renee', 'Renée'],
  ['Wart Jr.', 'Wart_Jr.'],
  ['Wart_Jr.', 'Wart Jr.'],
  ['Étoile', 'Etoile'],
  ['Etoile', 'Étoile'],
]);

export function fixName(name: string): string {
  if (nameMapping.has(name)) {
    return nameMapping.get(name)!;
  }
  return name;
}
