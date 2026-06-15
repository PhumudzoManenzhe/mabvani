/**
 * Browser module for the Universities page.
 * University search and card rendering is intentionally left for implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "universities",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Fetch universities from the API and render them into [data-university-list].
// TODO: Filter rendered universities from [data-university-filter-form].
// TODO: Link each university card to its real details page or slug route.
// TODO: Show an empty state when no universities match the filters.
// TODO: Wire [data-sign-out] to the auth/session service.
