const WORK_SLUG_ALIASES = {
  'iwhi-funnel-redesign': 'international-funnel-redesign',
};

const WORK_SLUG_ALIAS_LOOKUP = Object.fromEntries(
  Object.entries(WORK_SLUG_ALIASES).map(([internalSlug, publicSlug]) => [publicSlug, internalSlug]),
);

export function getCanonicalWorkSlug(slug) {
  return WORK_SLUG_ALIASES[slug] || slug;
}

export function getInternalWorkSlug(slug) {
  return WORK_SLUG_ALIAS_LOOKUP[slug] || slug;
}
