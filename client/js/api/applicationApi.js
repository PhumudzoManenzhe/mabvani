/**
 * API wrapper for applications.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const applicationsResourcePath = "/applications";

export function fetchApplicationsPlaceholder() {
  return apiRequest(applicationsResourcePath);
}
