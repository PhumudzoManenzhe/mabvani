/**
 * Shared frontend formatting helpers.
 */
export function formatPlaceholder(value) {
  return value == null || value === "" ? "Not supplied" : String(value);
}
