/**
 * API wrapper for universities.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const universitiesResourcePath = "/universities";

export function fetchUniversitiesPlaceholder() {
  return apiRequest(universitiesResourcePath);
}
