/**
 * Browser module for the Profile page.
 * Profile form persistence is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "profile",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Load the student's existing profile and populate [data-profile-form].
// TODO: Save personal, address, academic, contact, and financial fields on submit.
// TODO: Implement profile section tab switching for .student-tab buttons if desired.
// TODO: Wire [data-add-profile-subject] and [data-remove-profile-subject] to subject row management.
// TODO: Calculate APS from the subject rows and update [data-profile-aps].
// TODO: Wire [data-sign-out] to the auth/session service.
