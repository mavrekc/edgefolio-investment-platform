export function buildQuery(params = {}) {
  const qp = new URLSearchParams();

  Object.entries(params)
    .filter(([_, v]) => v != null && v !== '')
    .forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => qp.append(key, v));
      } else {
        qp.append(key, value);
      }
    });

  const str = qp.toString();
  return str ? `?${str}` : '';
}