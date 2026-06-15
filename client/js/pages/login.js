/**
 * Browser module for the Login page.
 * Form submission is intentionally left for the authentication implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "login",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Read [data-login-form] values and call your sign-in service.
// TODO: Connect [data-auth-google] to the Google OAuth flow.
// TODO: Show validation and API errors beside the relevant fields.
// TODO: Redirect authenticated users to the student dashboard.
