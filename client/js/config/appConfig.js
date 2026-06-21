/**
 * Central browser configuration for UniApply SA.
 * Production values should be supplied by deployment-time configuration.
 */
const runtimeConfig = window.UNIAPPLY_ENV || {};

export const APP_CONFIG = Object.freeze({
  SUPABASE_URL:
    runtimeConfig.SUPABASE_URL || "https://nttmzblwawzlfzocyvbj.supabase.co",
  SUPABASE_ANON_KEY:
    runtimeConfig.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dG16Ymx3YXd6bGZ6b2N5dmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDcxNDQsImV4cCI6MjA5NzEyMzE0NH0.Bl9NnDhdHdegDZjia_5QyeKg9nLPIwAfHRc4nZ0pCjU",
  API_BASE_URL:
    runtimeConfig.API_BASE_URL || "https://smartvarsity.onrender.com/api",
});
