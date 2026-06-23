/**
 * Browser module for the Student Dashboard page.
 * The template markup is static; connect live dashboard behaviour here.
 */
import { setCurrentPage } from "../utils/dom.js";
import { getProfile } from "../api/profileApi.js";
import { initializeStudentAuth } from "../auth/authUi.js";

export const page = Object.freeze({
  id: "studentDashboard",
  status: "template-static",
});

setCurrentPage(page.id);
await initializeStudentAuth();

const profileCompletionElement = document.querySelector(
  "[data-profile-completion]"
);
const profileProgressElement = document.querySelector(".student-progress span");
const profileProgressContainer = document.querySelector(".student-progress");

function normalisePercentage(value) {
  const percentage = Number(value);

  if (!Number.isFinite(percentage)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(percentage), 0), 100);
}

function renderProfileSummary(profile) {
  const completion = normalisePercentage(
    profile?.profile_completion_percentage
  );

  if (profileCompletionElement) {
    profileCompletionElement.textContent = `${completion}%`;
  }

  if (profileProgressElement) {
    profileProgressElement.style.width = `${completion}%`;
  }

  if (profileProgressContainer) {
    profileProgressContainer.setAttribute(
      "aria-label",
      `Profile completeness ${completion} percent`
    );
  }
}

async function loadStudentProfile() {
  try {
    const response = await getProfile();
    renderProfileSummary(response.data);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

loadStudentProfile();

// TODO: Fetch or calculate APS and update [data-aps-score].
// TODO: Count uploaded documents and update [data-documents-count].
// TODO: Load submitted/draft application totals.
// TODO: Replace the static closing dates with live university deadline data.
