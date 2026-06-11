/**
 * Frontend authentication service prepared for Supabase Auth.
 * Complete form integration will be implemented in a later phase.
 */
import { supabase } from "./supabaseClient.js";

const assertSupabaseConfigured = () => {
  if (!supabase) {
    throw new Error("Supabase frontend configuration is missing.");
  }
};

export async function registerWithEmail(email, password) {
  assertSupabaseConfigured();
  return supabase.auth.signUp({ email, password });
}

export async function loginWithEmail(email, password) {
  assertSupabaseConfigured();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function logout() {
  assertSupabaseConfigured();
  return supabase.auth.signOut();
}

export async function getCurrentAccessToken() {
  assertSupabaseConfigured();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session?.access_token || null;
}
