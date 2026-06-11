/**
 * Creates the browser Supabase client for authentication only.
 * Never place the Supabase service-role key in this file.
 */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { APP_CONFIG } from "../config/appConfig.js";

export const isSupabaseConfigured = Boolean(
  APP_CONFIG.SUPABASE_URL && APP_CONFIG.SUPABASE_ANON_KEY
);

export const supabase = isSupabaseConfigured
  ? createClient(APP_CONFIG.SUPABASE_URL, APP_CONFIG.SUPABASE_ANON_KEY)
  : null;
