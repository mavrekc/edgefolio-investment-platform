export function startsWithNonLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return false;
  }

  const code = str.charCodeAt(0);

  const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);

  return !isLetter;
}

export function isNotLetter(ch) {
  if (typeof ch !== "string" || ch.length !== 1) return true;

  const code = ch.charCodeAt(0);
  const isUppercase = code >= 65 && code <= 90;
  const isLowercase = code >= 97 && code <= 122;

  return !(isUppercase || isLowercase);
}

export function slugify(title) {
  return title
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeUniqueSlug(title, existingSet) {
  const base = slugify(title);
  let slug = base;
  let count = 2;
  while (existingSet.has(slug)) {
    slug = `${base}-${count}`;
    count += 1;
  }
  existingSet.add(slug);
  return slug;
}
