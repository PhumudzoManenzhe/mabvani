/**
 * Browser module for the Login page.
 * Form submission is intentionally left for the authentication implementation.
 */

import { setCurrentPage } from "../utils/dom.js";
import { hideLoading, showLoading } from "../utils/loadingUi.js";
import {
  getCurrentAccessToken,
  getCurrentUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
} from "../auth/authService.js";

export const page = Object.freeze({
  id: "login",
  status: "active",
});

setCurrentPage(page.id);

const loginForm = document.querySelector("[data-login-form]");
const googleButton = document.querySelector("[data-auth-google]");
const submitButton = loginForm?.querySelector('[type="submit"]');
const loginFields = {
  email: loginForm?.querySelector('[name="email"]'),
  password: loginForm?.querySelector('[name="password"]'),
};
const studentDashboardPath = "../../pages/student/dashboard.html";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const setupPasswordToggles = () => {
  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    const input = document.getElementById(button.getAttribute("aria-controls"));

    if (!input) {
      return;
    }

    button.addEventListener("click", () => {
      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      button.setAttribute("aria-pressed", String(!isVisible));
      button.setAttribute(
        "aria-label",
        isVisible ? "Show password" : "Hide password",
      );
      input.focus();
    });
  });
};

const errorElements = Object.fromEntries(
  Object.entries(loginFields).map(([name, field]) => {
    if (!field) {
      return [name, null];
    }

    const errorElement = document.createElement("p");
    errorElement.id = `${field.id || name}-error`;
    errorElement.className = "form-error";
    errorElement.hidden = true;
    errorElement.setAttribute("role", "alert");
    errorElement.style.color = "var(--color-error)";
    errorElement.style.fontSize = "0.85rem";
    errorElement.style.margin = "0";

    field.closest(".form-field")?.append(errorElement);
    field.setAttribute("aria-describedby", errorElement.id);

    return [name, errorElement];
  }),
);

setupPasswordToggles();

const clearErrors = () => {
  Object.entries(errorElements).forEach(([name, errorElement]) => {
    if (!errorElement) {
      return;
    }

    errorElement.textContent = "";
    errorElement.hidden = true;
    loginFields[name]?.removeAttribute("aria-invalid");
  });
};

const showFieldError = (name, message) => {
  const errorElement = errorElements[name];

  if (!errorElement) {
    return;
  }

  errorElement.textContent = message;
  errorElement.hidden = false;
  loginFields[name]?.setAttribute("aria-invalid", "true");
};

const showApiError = (error) => {
  const message = error?.message || "Unable to sign in. Please try again.";
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("email")) {
    showFieldError("email", message);
    return;
  }

  showFieldError("password", message);
};

/**
 * Email Login
 */
loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(loginForm);

  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  if (!email) {
    showFieldError("email", "Please enter your email address.");
  }

  if (email && !emailRegex.test(email)) {
    showFieldError("email", "Please enter a valid email address.");
  }

  if (!password) {
    showFieldError("password", "Please enter your password.");
  }

  if (!email || !emailRegex.test(email) || !password) {
    return;
  }

  submitButton?.setAttribute("disabled", "");
  showLoading("Signing you in...");

  try {
    const { error } = await loginWithEmail(email, password);

    if (error) {
      throw error;
    }

    window.location.href = studentDashboardPath;
  } catch (error) {
    console.error(error);
    showApiError(error);
    hideLoading();
    submitButton?.removeAttribute("disabled");
  }
});

/**
 * Google OAuth Login
 */
googleButton?.addEventListener("click", async () => {
  googleButton.disabled = true;
  showLoading("Opening Google sign in...");

  try {
    const { error } = await loginWithGoogle();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    alert(error.message || "Unable to continue with Google.");
    hideLoading();
    googleButton.disabled = false;
  }
});

(async () => {
  try {
    if (!(await getCurrentAccessToken())) {
      return;
    }

    if (await getCurrentUser()) {
      window.location.href = studentDashboardPath;
    }
  } catch (error) {
    console.error(error);
    await logout().catch((logoutError) => console.error(logoutError));
  }
})();
