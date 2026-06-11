/**
 * API wrapper for notifications.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const notificationsResourcePath = "/notifications";

export function fetchNotificationsPlaceholder() {
  return apiRequest(notificationsResourcePath);
}
