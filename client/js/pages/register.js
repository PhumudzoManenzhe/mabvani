/**
 * Browser module for the Register page.
 * Form submission is intentionally left for the registration implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import { registerWithEmail, loginWithGoogle } from "../auth/authService.js";

export const page = Object.freeze({
  id: "register",
  status: "active",
});

setCurrentPage(page.id);

const registerForm = document.querySelector("[data-register-form]");
const googleButton = document.querySelector("[data-auth-google]");

/**
 * Email Registration
 */
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const first_name = formData.get("first_name");
  const middle_name = formData.get("middle_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  if (!first_name.trim() || !last_name.trim()) {
    alert("Please enter your first name and last name.");
    return;
  }

  if (!email.trim()) {
    alert("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    alert("password must contain at least one uppercase");
    return;
  }

  if (!/[a-z]/.test(password)) {
    alert("password must contain at least one lowercase");
    return;
  }

  if (!/[0-9]/.test(password)) {
    alert("password must contain at least one number");
    return;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    alert("password must contain at least one special character");
    return;
  }

  if (!confirm_password.trim() || !password.trim()) {
    alert("Please enter password");
    return;
  }

  if (password !== confirm_password) {
    alert("password must match");
    return;
  }

  if (!password || password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  const user = {
    first_name: first_name.trim(),
    middle_name: middle_name?.trim() || "",
    last_name: last_name.trim(),
    email: email.trim(),
    password: password,
  };

  try {
    const { data, error } = await registerWithEmail(user);

    if (error) {
      throw error;
    }

    console.log("Registration successful:", data);

    alert(
      "Account created successfully. Please check your email to verify your account.",
    );
    window.location.href = "../../pages/student/dashboard.html";
    // TODO:
    // window.location.href = "/pages/auth/verify-email.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

/**
 * Google OAuth Registration
 */
googleButton?.addEventListener("click", async () => {
  try {
    const { error } = await loginWithGoogle();

    if (error) {
      throw error;
    }

    window.location.href = "../../pages/student/dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
// TODO: Read [data-register-form] values and call your account creation service.
// TODO: Connect [data-auth-google] to the Google OAuth signup flow.
// TODO: Validate full name, email, and password before sending the request.
// TODO: Redirect new students to profile setup or the dashboard after signup.
