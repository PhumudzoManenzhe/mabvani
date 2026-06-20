/**
 * API wrapper for profile.
 */
import { apiRequest } from "./apiClient.js";

export const profileResourcePath = "/profile";

export function getProfile() {
  return apiRequest(profileResourcePath);
}

export function updateProfile(profile) {
  return apiRequest(profileResourcePath, {
    method: "PATCH",
    body: JSON.stringify(profile),
  });
}
