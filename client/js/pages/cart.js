/**
 * Browser module for the Cart page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "cart",
  status: "placeholder",
});

setCurrentPage(page.id);
