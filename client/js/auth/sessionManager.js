/**
 * Session helper for reading Supabase access tokens before API requests.
 */
import { getCurrentAccessToken } from "./authService.js";

export async function getAccessTokenForApi() {
  return getCurrentAccessToken();
}

export async function hasActiveSession() {
  const token = await getAccessTokenForApi();
  return Boolean(token);
}
