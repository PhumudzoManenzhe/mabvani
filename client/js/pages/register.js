/**
 * Browser module for the Register page.
 * Form submission is intentionally left for the registration implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "register",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Read [data-register-form] values and call your account creation service.
// TODO: Connect [data-auth-google] to the Google OAuth signup flow.
// TODO: Validate full name, email, and password before sending the request.
// TODO: Redirect new students to profile setup or the dashboard after signup.
