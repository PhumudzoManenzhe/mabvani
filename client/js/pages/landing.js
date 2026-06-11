/**
 * Browser module for the Landing page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "landing",
  status: "placeholder",
});

setCurrentPage(page.id);
