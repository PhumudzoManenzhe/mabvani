/**
 * Checks whether a Supabase session exists before protected student pages load.
 */
import { getCurrentUser, logout } from "../auth/authService.js";

const loginPath = "../../pages/public/login.html";

export async function requireAuthenticatedUser() {
  try {
    const user = await getCurrentUser();

    if (user) {
      return { allowed: true, user };
    }
  } catch (error) {
    console.error(error);
    await logout().catch((logoutError) => console.error(logoutError));
  }

  return {
    allowed: false,
    redirectTo: new URL(loginPath, window.location.href).href,
    message: "Please sign in to continue.",
  };
}
