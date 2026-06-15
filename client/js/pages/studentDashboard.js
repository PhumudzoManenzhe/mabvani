/**
 * Browser module for the Student Dashboard page.
 * The template markup is static; connect live dashboard behaviour here.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "studentDashboard",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Fetch the signed-in student's profile and update [data-profile-completion].
// TODO: Fetch or calculate APS and update [data-aps-score].
// TODO: Count uploaded documents and update [data-documents-count].
// TODO: Load submitted/draft application totals.
// TODO: Replace the static closing dates with live university deadline data.
// TODO: Wire [data-sign-out] to the auth/session service.
