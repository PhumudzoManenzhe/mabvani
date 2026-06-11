/**
 * Checks whether a Supabase session exists before protected student pages load.
 */
export async function requireAuthenticatedUser() {
  return {
    allowed: false,
    message: "requireAuthenticatedUser has not been implemented yet.",
  };
}
