/**
 * API wrapper for recommendations.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const recommendationsResourcePath = "/recommendations";

export function fetchRecommendationsPlaceholder() {
  return apiRequest(recommendationsResourcePath);
}
