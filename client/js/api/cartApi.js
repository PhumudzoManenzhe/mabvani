/**
 * API wrapper for cart.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const cartResourcePath = "/cart";

export function fetchCartPlaceholder() {
  return apiRequest(cartResourcePath);
}
