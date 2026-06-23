/**
 * Browser module for the Applications page.
 * Application list rendering is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import { initializeStudentAuth } from "../auth/authUi.js";

export const page = Object.freeze({
  id: "applications",
  status: "template-static",
});

setCurrentPage(page.id);
await initializeStudentAuth();

// TODO: Fetch the student's applications and hide [data-applications-empty] when rows exist.
// TODO: Clone/render [data-application-row] for each application.
// TODO: Map application statuses to the correct .student-badge state class.
// TODO: Link each rendered row to the correct application details URL.
