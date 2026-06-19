/**
 * Browser module for the Register page.
 * Form submission is intentionally left for the registration implementation.
 */
import { setCurrentPage } from "../utils/dom.js";
import {
  registerWithEmail,
  loginWithGoogle,
} from "../auth/authService.js";

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

  const fullName = formData.get("full_name")?.trim();
  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  if (!fullName) {
    alert("Please enter your full name.");
    return;
  }

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  if (!password || password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  try {
    const { data, error } = await registerWithEmail(
      email,
      password
    );

    if (error) {
      throw error;
    }

    console.log("Registration successful:", data);

    alert(
      "Account created successfully. Please check your email to verify your account."
    );

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
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
// TODO: Read [data-register-form] values and call your account creation service.
// TODO: Connect [data-auth-google] to the Google OAuth signup flow.
// TODO: Validate full name, email, and password before sending the request.
// TODO: Redirect new students to profile setup or the dashboard after signup.
