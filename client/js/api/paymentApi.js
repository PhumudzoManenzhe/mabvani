/**
 * API wrapper for payments.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const paymentsResourcePath = "/payments";

export function fetchPaymentsPlaceholder() {
  return apiRequest(paymentsResourcePath);
}
