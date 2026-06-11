/**
 * API wrapper for profile.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const profileResourcePath = "/profile";

export function fetchProfilePlaceholder() {
  return apiRequest(profileResourcePath);
}
