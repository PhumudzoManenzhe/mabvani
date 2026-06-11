/**
 * Small DOM helpers for browser modules.
 */
export function setCurrentPage(pageId) {
  document.documentElement.dataset.page = pageId;
}

export function queryRequired(selector, parent = document) {
  const element = parent.querySelector(selector);

  if (!element) {
    throw new Error(`Required DOM element not found: ${selector}`);
  }

  return element;
}
