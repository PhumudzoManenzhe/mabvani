const overlayId = "app-loading-overlay";

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = overlayId;
  overlay.className = "app-loading-overlay";
  overlay.hidden = true;
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");

  const panel = document.createElement("div");
  panel.className = "app-loading-panel";

  const spinner = document.createElement("span");
  spinner.className = "app-loading-spinner";
  spinner.setAttribute("aria-hidden", "true");

  const message = document.createElement("p");
  message.className = "app-loading-message";

  panel.append(spinner, message);
  overlay.append(panel);
  document.body.append(overlay);

  return overlay;
}

function getOverlay() {
  return document.getElementById(overlayId) || createOverlay();
}

export function showLoading(message = "Loading...") {
  const overlay = getOverlay();
  const messageElement = overlay.querySelector(".app-loading-message");

  if (messageElement) {
    messageElement.textContent = message;
  }

  overlay.hidden = false;
}

export function hideLoading() {
  const overlay = document.getElementById(overlayId);

  if (overlay) {
    overlay.hidden = true;
  }
}
