/**
 * Browser module for the University Details page.
 * University detail and draft application behaviour is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "universityDetails",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Resolve the university slug/id from the URL and fetch university details.
// TODO: Populate university metadata, faculties, contact details, and courses.
// TODO: Use the student's APS/profile to update course eligibility badges.
// TODO: Wire [data-save-university] to saved university storage.
// TODO: Wire [data-start-application] to create a draft application.
// TODO: Wire [data-sign-out] to the auth/session service.
