/**
 * Browser module for the Applications page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "applications",
  status: "placeholder",
});

setCurrentPage(page.id);
