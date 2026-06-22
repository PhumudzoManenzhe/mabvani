/**
 * Central Fetch API wrapper for the Render REST API.
 * It attaches the Supabase access token when one is available.
 */
import { getAccessTokenForApi } from "../auth/sessionManager.js";
import { APP_CONFIG } from "../config/appConfig.js";
import { hideLoading, showLoading } from "../utils/loadingUi.js";

export async function apiRequest(path, options = {}) {
  const token = await getAccessTokenForApi();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  showLoading("Loading your data...");

  try {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : null;

    if (response.status === 401) {
      throw new Error("Your session has expired or is not authorised.");
    }

    if (!response.ok) {
      throw new Error(payload?.message || "The API request failed.");
    }

    return payload;
  } finally {
    hideLoading();
  }
}
