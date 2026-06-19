/**
 * Browser module for the Login page.
 * Form submission is intentionally left for the authentication implementation.
 */

import { setCurrentPage } from "../utils/dom.js";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../auth/authService.js";

export const page = Object.freeze({
  id: "login",
  status: "active",
});

setCurrentPage(page.id);

const loginForm = document.querySelector("[data-login-form]");
const googleButton = document.querySelector("[data-auth-google]");

/**
 * Email Login
 */
loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const { data, error } = await loginWithEmail(
      email,
      password
    );

    if (error) {
      throw error;
    }

    console.log("Login successful:", data);

    // TODO:
    window.location.href = "../../pages/student/dashboard.html";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

/**
 * Google OAuth Login
 */
googleButton?.addEventListener("click", async () => {
  try {
    const { error } = await loginWithGoogle();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// TODO: Read [data-login-form] values and call your sign-in service.
// TODO: Connect [data-auth-google] to the Google OAuth flow.
// TODO: Show validation and API errors beside the relevant fields.
// TODO: Redirect authenticated users to the student dashboard.
