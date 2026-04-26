export function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ensureArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

export function normalizeStatus(value, fallback = 'Draft') {
  if (!value) return fallback;
  const map = {
    published: 'Published',
    draft: 'Draft',
    archived: 'Archived',
    pending: 'Pending Review',
    registration_open: 'Registration Open',
    registration_closed: 'Registration Closed',
    upcoming: 'Upcoming',
    live: 'Live',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return map[String(value).toLowerCase()] || value;
}

export function toIsoDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export function safeString(value) {
  return typeof value === 'string' ? value : '';
}
