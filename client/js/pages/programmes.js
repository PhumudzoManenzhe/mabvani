/**
 * Browser module for the Programmes page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import { initializeStudentAuth } from "../auth/authUi.js";

export const page = Object.freeze({
  id: "programmes",
  status: "placeholder",
});

setCurrentPage(page.id);
await initializeStudentAuth();
