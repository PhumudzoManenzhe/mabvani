/**
 * Browser module for the Application Details page.
 * Application detail workflow is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "applicationDetails",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Resolve the application id from the URL and fetch application, university, course, profile, and document data.
// TODO: Populate [data-application-title], status, closing date, fee, and course options.
// TODO: Run readiness checks and show missing profile/document requirements.
// TODO: Populate prefilled portal fields and wire [data-copy-prefill].
// TODO: Wire [data-mark-submitted] to update application status and reference number.
// TODO: Wire [data-delete-application] with a confirmation step before deletion.
// TODO: Wire [data-sign-out] to the auth/session service.
