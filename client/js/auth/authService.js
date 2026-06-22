/**
 * Frontend authentication service prepared for Supabase Auth.
 */
import { supabase } from "./supabaseClient.js";

const studentDashboardPath = "../../pages/student/dashboard.html";
const studentProfilePath = "../../pages/student/profile.html";

const assertSupabaseConfigured = () => {
  if (!supabase) {
    throw new Error("Supabase frontend configuration is missing.");
  }
};

const getRedirectUrl = (path) => new URL(path, window.location.href).href;

export async function registerWithEmail(user) {
  assertSupabaseConfigured();

  return supabase.auth.signUp({
    email: user.email,
    password: user.password,

    options: {
      data: {
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
      },
    },
  });
}

export async function loginWithEmail(email, password) {
  assertSupabaseConfigured();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function loginWithGoogle() {
  assertSupabaseConfigured();

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getRedirectUrl(studentDashboardPath),
    },
  });
}

export async function registerWithGoogle() {
  assertSupabaseConfigured();

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getRedirectUrl(studentProfilePath),
    },
  });
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

export async function getCurrentUser() {
  assertSupabaseConfigured();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}
