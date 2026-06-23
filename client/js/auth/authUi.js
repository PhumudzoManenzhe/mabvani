import { logout } from "./authService.js";
import { requireAuthenticatedUser } from "../guards/authGuard.js";
import { hideLoading, showLoading } from "../utils/loadingUi.js";

const loginPath = "../../pages/public/login.html";

function getLoginUrl() {
  return new URL(loginPath, window.location.href).href;
}

export async function protectStudentPage() {
  showLoading("Checking your session...");
  const result = await requireAuthenticatedUser();

  if (!result.allowed) {
    window.location.replace(result.redirectTo || getLoginUrl());
    return result;
  }

  hideLoading();
  return result;
}

export function bindSignOut() {
  document.querySelectorAll("[data-sign-out]").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      showLoading("Signing you out...");

      try {
        const { error } = await logout();

        if (error) {
          throw error;
        }

        window.location.replace(getLoginUrl());
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to sign out. Please try again.");
        hideLoading();
        button.disabled = false;
      }
    });
  });
}

export async function initializeStudentAuth() {
  const result = await protectStudentPage();

  if (result.allowed) {
    bindSignOut();
  }

  return result;
}
