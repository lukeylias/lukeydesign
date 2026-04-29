export function getCanonicalRouteForEntryType(entryType) {
  if (entryType === 'blog') return '#/blog';
  if (entryType === 'case-studies') return '#/case-studies';
  if (entryType === 'stack') return '#/stack';
  return '#/';
}

export function navigateBackOrFallback({ hasInAppHistory, fallbackHref }) {
  if (hasInAppHistory && window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.hash = fallbackHref;
}
