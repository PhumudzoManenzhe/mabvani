/**
 * Central browser configuration for UniApply SA.
 * Production values should be supplied by deployment-time configuration.
 */
const runtimeConfig = window.UNIAPPLY_ENV || {};

export const APP_CONFIG = Object.freeze({
  SUPABASE_URL: runtimeConfig.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: runtimeConfig.SUPABASE_ANON_KEY || "",
  API_BASE_URL: runtimeConfig.API_BASE_URL || "http://localhost:3000/api",
});
