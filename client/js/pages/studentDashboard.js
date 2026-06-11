/**
 * Browser module for the Student Dashboard page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "studentDashboard",
  status: "placeholder",
});

setCurrentPage(page.id);
