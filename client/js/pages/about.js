/**
 * Browser module for the About page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "about",
  status: "placeholder",
});

setCurrentPage(page.id);
