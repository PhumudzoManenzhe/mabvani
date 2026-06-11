/**
 * Server-side Supabase client for verifying Supabase Auth access tokens.
 * This file may use the service-role key because it never runs in the browser.
 */
const { createClient } = require("@supabase/supabase-js");
const { env } = require("./environment");

const supabase = env.supabaseUrl && env.supabaseServiceRoleKey
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

module.exports = {
  supabase,
};
