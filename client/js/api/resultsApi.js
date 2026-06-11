/**
 * API wrapper for results.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const resultsResourcePath = "/results";

export function fetchResultsPlaceholder() {
  return apiRequest(resultsResourcePath);
}
