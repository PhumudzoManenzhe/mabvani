/**
 * Browser module for the Landing page.
 * The template is rendered statically; add behaviour here when the app layer is ready.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "landing",
  status: "template-static",
});

setCurrentPage(page.id);

// TODO: Load real university availability and deadline highlights for the landing page.
// TODO: Wire "Get started" analytics or onboarding tracking when product analytics exists.
// TODO: Replace static institution chips with data from the universities API if needed.
