/**
 * API wrapper for programmes.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const programmesResourcePath = "/programmes";

export function fetchProgrammesPlaceholder() {
  return apiRequest(programmesResourcePath);
}
