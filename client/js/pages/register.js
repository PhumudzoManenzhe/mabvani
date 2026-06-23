/**
 * Browser module for the Register page.
 * Form submission is intentionally left for the registration implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import { hideLoading, showLoading } from "../utils/loadingUi.js";
import { registerWithEmail, registerWithGoogle } from "../auth/authService.js";

export const page = Object.freeze({
  id: "register",
  status: "active",
});

setCurrentPage(page.id);

const registerForm = document.querySelector("[data-register-form]");
const googleButton = document.querySelector("[data-auth-google]");
const submitButton = registerForm?.querySelector('[type="submit"]');
const registerFields = {
  first_name: registerForm?.querySelector('[name="first_name"]'),
  middle_name: registerForm?.querySelector('[name="middle_name"]'),
  last_name: registerForm?.querySelector('[name="last_name"]'),
  email: registerForm?.querySelector('[name="email"]'),
  password: registerForm?.querySelector('[name="password"]'),
  confirm_password: registerForm?.querySelector('[name="confirm_password"]'),
};
const loginPath = "../../pages/public/login.html";
const studentProfilePath = "../../pages/student/profile.html";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[\p{L}][\p{L}' -]*$/u;

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
  Object.entries(registerFields).map(([name, field]) => {
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
    registerFields[name]?.removeAttribute("aria-invalid");
  });
};

const showFieldError = (name, message) => {
  const errorElement = errorElements[name];

  if (!errorElement) {
    return;
  }

  errorElement.textContent = message;
  errorElement.hidden = false;
  registerFields[name]?.setAttribute("aria-invalid", "true");
};

const showApiError = (error) => {
  const message =
    error?.message || "Unable to create your account. Please try again.";
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("email")) {
    showFieldError("email", message);
    return;
  }

  if (lowerMessage.includes("password")) {
    showFieldError("password", message);
    return;
  }

  showFieldError("email", message);
};

/**
 * Email Registration
 */
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(registerForm);
  const first_name = formData.get("first_name")?.trim() || "";
  const middle_name = formData.get("middle_name")?.trim() || "";
  const last_name = formData.get("last_name")?.trim() || "";
  const email = formData.get("email")?.trim().toLowerCase() || "";
  const password = formData.get("password") || "";
  const confirm_password = formData.get("confirm_password") || "";
  let hasError = false;

  if (!first_name) {
    showFieldError("first_name", "Please enter your first name.");
    hasError = true;
  } else if (!nameRegex.test(first_name)) {
    showFieldError(
      "first_name",
      "Use letters, spaces, hyphens, or apostrophes only.",
    );
    hasError = true;
  }

  if (middle_name && !nameRegex.test(middle_name)) {
    showFieldError(
      "middle_name",
      "Use letters, spaces, hyphens, or apostrophes only.",
    );
    hasError = true;
  }

  if (!last_name) {
    showFieldError("last_name", "Please enter your last name.");
    hasError = true;
  } else if (!nameRegex.test(last_name)) {
    showFieldError(
      "last_name",
      "Use letters, spaces, hyphens, or apostrophes only.",
    );
    hasError = true;
  }

  if (!email) {
    showFieldError("email", "Please enter your email address.");
    hasError = true;
  } else if (!emailRegex.test(email)) {
    showFieldError("email", "Please enter a valid email address.");
    hasError = true;
  }

  if (!password) {
    showFieldError("password", "Please enter your password.");
    hasError = true;
  } else if (password.length < 8) {
    showFieldError("password", "Password must be at least 8 characters.");
    hasError = true;
  } else if (!/[A-Z]/.test(password)) {
    showFieldError(
      "password",
      "Password must contain at least one uppercase letter.",
    );
    hasError = true;
  } else if (!/[a-z]/.test(password)) {
    showFieldError(
      "password",
      "Password must contain at least one lowercase letter.",
    );
    hasError = true;
  } else if (!/[0-9]/.test(password)) {
    showFieldError("password", "Password must contain at least one number.");
    hasError = true;
  } else if (!/[!@#$%^&*]/.test(password)) {
    showFieldError(
      "password",
      "Password must contain at least one special character.",
    );
    hasError = true;
  }

  if (!confirm_password) {
    showFieldError("confirm_password", "Please confirm your password.");
    hasError = true;
  } else if (password && password !== confirm_password) {
    showFieldError("confirm_password", "Passwords must match.");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const user = {
    first_name,
    middle_name,
    last_name,
    email,
    password,
  };

  submitButton?.setAttribute("disabled", "");
  showLoading("Creating your account...");

  try {
    const { data, error } = await registerWithEmail(user);

    if (error) {
      throw error;
    }

    alert("Account created successfully.");
    window.location.href = data.session ? studentProfilePath : loginPath;
    return;
  } catch (error) {
    console.error(error);
    showApiError(error);
    hideLoading();
    submitButton?.removeAttribute("disabled");
  }
});

/**
 * Google OAuth Registration
 */
googleButton?.addEventListener("click", async () => {
  googleButton.disabled = true;
  showLoading("Opening Google sign up...");

  try {
    const { error } = await registerWithGoogle();

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
