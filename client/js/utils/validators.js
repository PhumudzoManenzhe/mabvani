/**
 * Shared frontend validators.
 * Add reusable validation helpers here as forms are implemented.
 */
export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
