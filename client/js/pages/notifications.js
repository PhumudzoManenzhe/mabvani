/**
 * Browser module for the Notifications page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "notifications",
  status: "placeholder",
});

setCurrentPage(page.id);
