/**
 * Browser module for the APS Calculator page.
 * APS calculation behaviour is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "results",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Calculate APS from [data-aps-form] subject and mark rows.
// TODO: Exclude Life Orientation and use the top six eligible subjects.
// TODO: Update [data-aps-result] and [data-aps-band] after each change.
// TODO: Wire [data-add-aps-subject] and [data-remove-aps-subject] to manage rows.
// TODO: Save calculated APS back to the student's profile if required.
// TODO: Wire [data-sign-out] to the auth/session service.
