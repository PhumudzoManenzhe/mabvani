/**
 * Browser module for the Application Details page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "applicationDetails",
  status: "placeholder",
});

setCurrentPage(page.id);
