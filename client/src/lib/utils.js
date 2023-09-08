export const isNullOrUndefined = (value) =>
  typeof value === "undefined" || value === null;

export const isEmpty = (value) => {
  if (isNullOrUndefined(value)) return true;
  if (value === "") return true;
  if (typeof value === "number" || value instanceof Date) return false;
  if (typeof value === "object") return Object.keys(value).length === 0;

  return false;
};
