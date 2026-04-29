export function sortEntriesByDate(items) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function matchesFeedFilter(entry, filter) {
  if (filter === 'all') return true;
  return entry.type === filter;
}

export function formatEntryDate(date) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
