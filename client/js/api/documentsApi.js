/**
 * API wrapper for documents.
 * Complete request methods will be added when the feature is implemented.
 */
import { apiRequest } from "./apiClient.js";

export const documentsResourcePath = "/documents";

export function fetchDocumentsPlaceholder() {
  return apiRequest(documentsResourcePath);
}
