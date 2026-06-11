/**
 * Browser module for the Admin Dashboard page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "adminDashboard",
  status: "placeholder",
});

setCurrentPage(page.id);
