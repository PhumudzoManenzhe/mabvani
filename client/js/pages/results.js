/**
 * Browser module for the Results page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "results",
  status: "placeholder",
});

setCurrentPage(page.id);
