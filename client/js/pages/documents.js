/**
 * Browser module for the Documents page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "documents",
  status: "placeholder",
});

setCurrentPage(page.id);
